# 优雅的提交你的 Git Commit Message

## Commit message 的作用

1. 提供更多的历史信息，方便快速浏览。
2. 可以过滤某些commit（比如文档改动），便于快速查找信息。
```bash
git log <last release> HEAD --grep feature
```
3. 可以直接从commit生成Change log。

## Commit Message 格式

Commitizen是一个撰写合格 Commit message 的工具。
1. 安装
```bash
yarn add commitizen cz-conventional-changelog --dev
```
2. 之后在 `package.json` 添加脚本 `"commit": "git-cz"`
```bash
{
  "name": "gzyitihua",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "test": "eslint",
    "commit": "git-cz"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": [
      "eslint",
      "git add"
    ]
  },
  "devDependencies": {
    "commitizen": "^4.0.3",
    "cz-conventional-changelog": "^3.0.2",
    "cz-customizable": "^6.2.0",
    "eslint": "^6.0.0",
    "husky": "^2.4.1",
    "lint-staged": "^8.2.1"
  },
  "dependencies": {},
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    }
  }
}
```

## 自定义 Adapter

也许 Angular 的那套规范我们不习惯, 那么可以通过指定 Adapter cz-customizable 指定一套符合自己团队的规范。

1. 全局 或 项目级别安装:
```bash
yarn add global cz-customizable
or
yarn add cz-customizable --dev
```

2. 修改 .czrc 或 package.json 中的 config 为:
```bash
{ "path": "cz-customizable" }
or
  "config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    }
  }
```
3. 同时在~/ 或项目目录下创建 .cz-config.js 文件, 维护你想要的格式，如
```bash
'use strict';
module.exports = {

  types: [

    {
      value: 'feat',
      name : 'feat:     A new feature'
    },
    {
      value: 'fix',
      name : 'fix:      A bug fix'
    },
    {
      value: 'refactor',
      name : 'refactor: A code change that neither fixes a bug nor adds a feature'
    },
    {
      value: 'docs',
      name : 'docs:     Documentation only changes'
    },
    {
      value: 'test',
      name : 'test:     Add missing tests or correcting existing tests'
    },
    {
      value: 'chore',
      name : 'chore:    Changes that don\'t modify src or test files. Such as updating build tasks, package manager'
    },
    {
      value: 'style',
      name : 'style:    Code Style, Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'
    },
    {
      value: 'revert',
      name : 'revert:   Revert to a commit'
    },
    {
      value: 'version',
      name: 'version: 发版本用的'
    }
  ],

  scopes: ["一张图","辅助审批","辅助审查","辅助编制","监测预警","公共模块","行业管理","cli","版本更新"],

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};
```

## 生成 Change log

## 参考资料

- [Commit message 和 Change log 编写指南](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
- [优雅的提交你的 Git Commit Message](https://zhuanlan.zhihu.com/p/34223150)