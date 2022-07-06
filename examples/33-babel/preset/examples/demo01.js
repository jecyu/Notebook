const babel = require('@babel/core');

const sourceCode = `
  import "core=js";
  new Array(5).fill('111');
`;

const { code, map } = babel.transformSync(sourceCode, {
    filename: 'a.mjs',
    plugins: [[
        '@babel/transform-runtime',
        {
            corejs: 3
        }
    ]],
    targets: {
        browsers: 'Chrome 45'
    },
    presets: [
        ['@babel/env', {
            debug: true,
            useBuiltIns: 'usage',
            corejs: 3
        }]
    ]
});

console.log(code);