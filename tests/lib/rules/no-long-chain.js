const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/no-long-chain');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2020, sourceType: 'module' } });

ruleTester.run('no-long-chain', rule, {
  valid: ['const s = obj?.name?.s', 'const s = obj()?.name()?.s'],
  invalid: [
    {
      code: 'const s1 = obj?.name?.s?.s',
      errors: [
        {
          messageId: 'maxChainTip',
          data: { max: 2 },
        },
      ],
    },
    {
      code: 'const f = fn()?.fn()?.fn()?.fn();',
      errors: [
        {
          messageId: 'maxChainTip',
          data: { max: 2 },
        },
      ],
    },
    {
      code: 'const f = fn()?.fn().fn()?.fn().a?.b;',
      errors: [
        {
          messageId: 'maxChainTip',
          data: { max: 2 },
        },
      ],
    },
  ],
});
