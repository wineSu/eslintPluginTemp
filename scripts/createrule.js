#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const ejs = require('ejs');
const j = require('jscodeshift');

const RULE_NAME = process.argv[2];
const TARGET_PATH = {
  doc: '../docs/rules/',
  rule: '../lib/rules/',
  test: '../tests/lib/rules/',
};

// tools
const callback = (fn) => (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  if (fn) {
    fn(res);
  }
};
const getFileName = (file) => file.replace(/(.*\/)*([^.]+).*/gi, '$2');
const existFile = (dirname) => fs.existsSync(dirname);

const getFileList = () => {
  return new Promise((resolve) => {
    glob(
      `${path.join(__dirname, '../temp/*.ejs')}`,
      callback((file) => {
        resolve(file);
      }),
    );
  });
};

const renderFile = (file) => {
  return new Promise((resolve) => {
    const fileName = getFileName(file);
    ejs.renderFile(
      file,
      { name: RULE_NAME },
      callback((content) => {
        resolve({ fileName, content });
      }),
    );
  });
};

const writeFile = ({ fileName, content }) => {
  return new Promise((resolve, reject) => {
    const targetPath = `${path.join(__dirname, TARGET_PATH[fileName])}${RULE_NAME}.${
      fileName === 'doc' ? 'md' : 'js'
    }`;
    const inforPath = targetPath.split('packages/')[1];

    if (existFile(targetPath)) {
      const meg = `\u001B[31m fail: the rule name 【${RULE_NAME}】 has existed! \u001B[0m`;
      reject(meg);
      return;
    }

    fs.writeFile(
      targetPath,
      content,
      callback(() => {
        console.log(`\u001B[32m write ${inforPath} success! \u001B[0m`);
        resolve();
      }),
    );
  });
};

const writeRule = (filePathList) =>
  filePathList.reduce((pre, next) => {
    return pre.then(() => renderFile(next)).then(writeFile);
  }, Promise.resolve());

// rule index.js ast write
const getAst = () => {
  const content = fs.readFileSync(`${path.join(__dirname, '../lib/index.js')}`);
  return j(content.toString());
};
const trans = (ast) => {
  const ret = ast.find(j.ObjectExpression).filter(({ parent = {} }) => {
    const astPath = parent.value;
    if (j.Property.check(astPath)) {
      if (astPath.key.name === 'rules') {
        return true;
      }
    }
    return false;
  });

  ret.replaceWith((p) => {
    const { node } = p;
    node.properties.push(
      j.property('init', j.literal(`xxx/self/${RULE_NAME}`), j.literal('off')),
    );
    return node;
  });

  return ast.toSource({ quote: 'single', trailingComma: true });
};
const entryWrite = () => {
  const content = trans(getAst());
  fs.writeFile(
    path.join(__dirname, '../lib/index.js'),
    content,
    callback(() => {
      console.log(`\u001B[32m write lib/index.js success! \u001B[0m`);
    }),
  );
};

// start app
const appStart = async () => {
  try {
    const filePathList = await getFileList();
    await writeRule(filePathList);
    entryWrite();
  } catch (e) {
    console.error(e);
  }
};
appStart();
