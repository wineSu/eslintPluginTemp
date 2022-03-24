# xxx/eslint-plugin-self

----
1. [插件用途](#jump1)
2. [插件使用](#jump2)
3. [项目中配置](#jump3)
4. [文件结构](#jump4)
5. [自定义规则创建](#jump5)
6. [规则编写步骤](#jump6)
----

## <span id="jump1">插件用途</span>
创建 eslint 插件脚本

## <span id="jump2">插件使用</span>
安装包
```
tnpm install xxx/eslint-plugin-self --save
```

## <span id="jump3">项目中配置</span>
`.eslintrc.js`
```
module.exports = {
    extends: [
        ...
        'plugin:xxx/eslint-plugin-self/recommended'
    ],
    plugins: [
        'xxx/self' // 省略 `eslint-plugin-` 前缀
    ],
    // 或单独指定规则
    // rules: {
    //     "xxx/self/no-relative-path": "error"
    // }
};
```

## <span id="jump4">文件结构</span>
    .
    ├── docs                         
    │   └── rules                   添加新规则文档说明
    │       └── add-your-rules.md     
    ├── lib           
    │   ├── index.js                添加对外暴露           
    │   └── rules                   添加新规则
    │       └── add-your-rules.js     
    ├── tests                       测试自定义规则
    │   └── lib
    │       └── rules               添加新规则测试用例
    │           └── add-your-rules.js
    ├── package.json
    └── README.md                   插件介绍文档


## <span id="jump5">自定义规则创建</span>

快速创建规则，根目录执行如下命令：
```
npm run createrule -- 【your-rule-name】
```

快速补充规则到 README.md:
```
npm run gen-readme-rules
```

## <span id="jump6">规则编写步骤</span>
- 规则逻辑

    https://eslint.bootcss.com/docs/developer-guide/working-with-rules

- 规则测试

    按照创建出的模板补充详细的用例说明，编写完成后使用如下命令测试：
    ```
    npm run test:eslint-plugin-self
    ```

- 规则文档

    文档编写应简单明了，说明规则用途和相关示例

- 更新 README.md:
    ```
    npm run gen-readme-rules
    ```


