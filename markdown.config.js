const { rules } = require('.');

const ruleTableRows = Object.keys(rules)
  .sort()
  .map((id) => {
    const { meta } = rules[id];
    const { fixable, docs } = meta;
    return [
      docs.recommended ? '✔' : '',
      fixable ? '🔧' : '',
      `[@alife/ajx/${id}](https://code.aone.alibaba-inc.com/ajx-c1-spec-kits/ajx-spec/blob/master/packages/eslint-plugin-ajx/docs/rules/${id}.md)`,
      docs.description,
    ].join(' | ');
  });

const buildRulesTable = (rows) => {
  const header = '✔ | 🔧 | Rule | Description';
  const separator = ':---: | :---: | :--- | :---';

  return [header, separator, ...rows].map((row) => `| ${row} |`).join('\n');
};

const RULES = () => buildRulesTable(ruleTableRows);

module.exports = {
  transforms: {
    RULES,
  },
  callback: () => {
    console.log('The auto-generating of rules finished!');
  },
};
