# no-long-chain

    Avoid long call chains


## Rule Details

    This rule aims to long call chains.

Examples of **incorrect** code for this rule:

```js
    const a = obj?.name?.where?.a;
    const f = fn()?.fn()?.fn()?.fn();

```

Examples of **correct** code for this rule:

```js
    const a = obj?.name?.a;
    const b = obj?.b;
    //-------
    const aName = obj?.name;
    const a = aName?.where?.a;

    const f = fn()?.fn()?.fn;

```

## Options

```js
    // max length
    rules: {
        'xxxx/self/no-long-chain': [
          'warn',
          {
            max: 2,
          },
        ],
      },

```

## When Not To Use It

    if you don't care the call chain is too long
