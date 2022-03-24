/**
 * @fileoverview no-relative-path
 */

const requireIndex = require('requireindex');

module.exports = {
  rules: requireIndex(`${__dirname}/rules`),
  configs: {
    recommended: {
      rules: {
        
        'xxx/self/no-long-chain': [
          'warn',
          {
            max: 2,
          },
        ],
      },
    },
  },
};
