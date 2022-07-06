const babel = require('@babel/core');

const sourceCode = `
class Dong {
}
`;

const sourceCode2 = `
async function func() {
}
`

const sourceCode3 = `
new WeakMap();
`;

const { code, map } = babel.transformSync(sourceCode2, {
    filename: 'a.mjs',
    targets: {
        browsers: 'Chrome 30'
    },
    presets: [
        [
            '@babel/env', 
            {
                debug: true,
                useBuiltIns: 'usage',
                corejs: 3
            }
        ]
    ],
    // 可以注释这行对比之前与之后的代码变化
    plugins: [
        [
            '@babel/plugin-transform-runtime', 
            {
                corejs: 3
            }
        ]
    ]
});

console.log(code);