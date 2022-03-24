/**
 * no-long-chain
 * eg:
 *  ?.?.?.?.
 *  ?()?.()?.()
 */

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce a maximum number of optional chain expression',
      category: 'suggestion',
      recommended: true,
    },
    // fix code: use "code" or "whitespace"
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          max: { type: 'number' },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      maxChainTip: 'The call chain length is limited to {{max}}',
    },
  },

  create(context) {
    // max chain length
    const { max = 2 } = context.options[0] || {};
    const isMemberExpression = (_node) => _node.type === 'MemberExpression';
    const isCallExpression = (_node) => _node.type === 'CallExpression';

    return {
      // visitor functions for different types of nodes
      ChainExpression: (node) => {
        const pNode = node.parent;
        if (isMemberExpression(pNode) || isCallExpression(pNode)) {
          return;
        }
        const optionals = [];
        let expressionNode = node.expression;

        while (isMemberExpression(expressionNode) || isCallExpression(expressionNode)) {
          if (expressionNode.optional) {
            optionals.push(expressionNode);
          }
          if (isMemberExpression(expressionNode)) {
            expressionNode = expressionNode.object;
          } else if (isCallExpression(expressionNode)) {
            expressionNode = expressionNode.callee;
          }
        }

        if (optionals.length > max) {
          context.report({
            node,
            messageId: 'maxChainTip',
            data: {
              max,
            },
          });
        }
      },
    };
  },
};
