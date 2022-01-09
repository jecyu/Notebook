# naluduo 参与 devui 的一个月，他经历了什么

<img src="/Users/kayliang/Library/Application Support/typora-user-images/image-20211114174012891.png" alt="image-20211114174012891" style="zoom:30%;" />

## 前言

2021 年，Vue3、TypeScript、Vite 技术火热，火热到什么程度呢？前端er 们都热衷于讨论实践这些技术，社区上大量的讨论学习文章。如果你去面试了，如果你之前工作的技术栈是 Vue，面试官也会跟你聊上几句，你知道 Vue2 和 Vue3 的区别、Vite 比 Webpack 好在哪？你用过 TS 吗？它与 JS 有什么区别？

对 naluduo 来说，作为一名普通前端开发，不是毕业于名校或就职于大厂，不断地学习，培养学习能力，保持自己的核心竞争力很重要。于是 naluduo 跟着一些教学视频、文章模仿写一些小 demo，尝试接受学习这些新概念。但是这种做法并没有解除我的焦虑，因为没有在项目中实践，也只是自己闭门造车，实践中也有很多疑问，也苦恼于工作项目没有机会接触到上面的技术栈。当然，社区上也出现了不少好的开源项目比如 element-plus、v-vben，（一来是它们开源的时候已经完善，二来是由于缺少相关的官方社区参与指引），对于 naluduo 来说，很难参与其中。直到 naluduo 在掘金上遇上了 华为 Devui 组件库，官方的手把手带教学让我更容易地参与其中，最终成为了 Contributor 。不再是一个人的闭门造车，而是有一堆小伙伴和你一起开发、讨论、一起进步，一起掌握新的技术 Vue3、TypeScript、Vite、仍至整个组件库的工程化建设。

文章大纲

- 我经历了什么
- 参与 Devui 的感受
- 未来规划
- 关于 Devui

## 我经历了什么

### 初来乍到，认领组件

2021 年 8 月 5 日，像往上一样在掘金冲浪时，偶然间。看到了 Devui 团队招募开发者，开发名为 vue devui 的 ng devui 版本，组件库使用了 vue3、vite 、typescript 、jsx的技术栈吸引了我。机会来了，得赶紧抓住。火速添加 Devui 小助手，顺利加入了开发者微信群。

<img src="/Users/kayliang/Library/Application Support/typora-user-images/image-20211114205905292.png" alt="image-20211114205905292" style="zoom:50%;" />

进入群里，便有 Devui 小助手说明如何参与开发：

- 首先查看 README 的贡献者花名册，里面记录了组件田和田主的情况，这样就不会出现多个人一起开发一个组件。
- 然后在 Gitee 仓库底部的评论进行回复认领即可
- 认领后，先 fork一个仓库到自己仓库，然后从 dev 分支拉特性分支进行开发，开发完提 pr，贡献者相互帮忙检视，没问题就可以合入。

考虑到之前对拖拽的实现不太了解，我抢了两个感兴趣且对自己有挑战的组件。大家参与的热情真的很高，手快有手快无。

- Splitter 分割器
- Dragdrop 拖拉组件

> 认领了组件，你就是这个组件的田主啦，田主要对自己的组件田负起责任来，尽量都做成精品。如果做不到需要提前知会出来，并且释放这个组件，这样如果有其他小伙伴感兴趣可以领哦——来自组件库负责人 kagol 大佬的原话。

### 咬牙坚持，一一攻破

Devui 的参与开源方式是通过认领组件，我选择了 「Splitter」和 「DragDrop」组件。虽然是 8 月 5 号就认领了这两个组件，小助手也说可以直接参考 ng-devui 的规范和代码实现来，先踏出自己的第一步。我还是步伐太慢了，直到 9 月 13 才发起了第一个 pr。究其原因，一是因为一直都没有了解过这两个组件里面的原理实现，二是里面用到的技术栈 vue3、ng、 jsx、ts  对我来说也很陌生，三是就是每天抽空去做这个事情，好在 Devui 给予的时间很充分，暂时没有很明确的时间节点。

> 官网：https://devui.design/
> ng-devui：https://github.com/DevCloudFE/ng-devui

由于之前没接触过 ng devui，每天抽空去了解 ng 的实现，大概花了我一周的时间，主要通过官方文档、书籍《揭秘 Angular 2》等方式学习，终于能够了解 Angular 的服务、模块、指令、模版等概念，基本上可以看得懂 Devui 的 ng 版本源代码了。接下来就可以进入开发了，由于 DragDrop 属于 Devui 组件库的十大复杂组件之一，于是我选择先从 「Splitter」组件入手。

TypeScript 和 Vue3 也是边做边学，对于 ts 推荐阿宝哥的 TypeScript 教程。至于 Vue3 的话，我是一边实现 Splitter 的功能，一边看官方文档，期间还下载了 element3、ant-design-vue 源码进行学习。

<img src="/Users/kayliang/Library/Application Support/typora-user-images/image-20211128223204845.png" alt="image-20211128223204845" style="zoom:80%;" />

通过完成编写 Splitter 组件的功能、单元测试，也顺利掌握了 vue3、ts 等技术栈。

### 提了 PR，成为 contributor

离给 Devui 提的第一个 pr 已经过去 2 个月了，还记得当时第一个人 pr 被合并的心情，高兴了好几天。

![image-20211113182228420](/Users/kayliang/Library/Application Support/typora-user-images/image-20211113182228420.png)





发起了第一个 pr，接下来就是等待被检视，既想代码快点被检视，又怕自己的代码写的太烂。正如参与 Devui 的其中一个同学 「TinsFox」的经历一样，“就像有一位前辈或导师在旁边指导一样”，“被检视时既期待又害怕，期待的是别人能发现自己的知识盲区，帮助自己改进，害怕的是被暴露自己很菜”。以下是一些更新日志，小步快走。

2021-09-25 更新

1. 添加指定折叠收起方法例子
2. 恢复误修改的 vite.config 配置

2021-09-21 更新

1. 添加组合布局用法

2021-09-20 更新

1. 添加垂直布局特性，改造 splitter-store

2021-09-17 更新

1. 新增 Splitter 组件，暂时支持基本用法。
2. 后续补上其他功能，以及相关的测试用例。
3. 已根据 [!103:新增 splitter 组件](https://gitee.com/devui/vue-devui/pulls/103):新增 splitter 组件 的检视意见进行修改（由于个人误操作问题，所以重新提交 pr，麻烦各位检视）

负责代码检视的大佬们很认真负责，从代码规范、TypeScript 编写等方面对代码进行评论，根据反馈的建议后，最终 pr 被合并，终于成为提供了实质代码的贡献者。

在编写 Splitter 的 Demo 时，发现了「 vite-press-theme-demoblock」 开源库不支持 scss 编写，然后提了一个的 issue。于是下载它的源码进行研究后，期间还发现别的 bug，顺带修复了，最终作者也在新的版本中支持了在 demo 中使用 scss 样式特性， 也算是间接为 devui 组件库做了贡献。

<img src="/Users/kayliang/Library/Application Support/typora-user-images/image-20211128224748921.png" alt="image-20211128224748921" style="zoom:50%;" />

## 参与 Devui 的感受

### 我的初心

我收获了什么

devui 是摸着石头过河，我是摸着 devui 过河。

- git 协作
- 单元测试

### 一些收获

kaogl 大佬的语录

编码不用完全照着ng devui的来，不合理之处可以优化的，大家做的过程中一定要多思考组件设计的合理性

每个人都有一个成长的过程，多写代码，也多参考优秀的大佬写的代码，每个人都能成长为大佬的

### 对开源的思考

参与开源，一直是我工作学习之余渴望能够做的。我比较俗，只是觉得参与开源的话，一来可以给自己的简历加分，二来也希望学习和分享好代码，在开源社区中得到反馈和成长，可以反哺工作。

通过了解，参与开源，有很多种方式，可以：

- 自己创建开源项目
- 参与别人的项目
  - 为项目编写教程文档、翻译文档
  - 提 issues、回答 issues
  - 开发新功能，添加测试用例
  - 编写该开源项目踩坑/教程文章，在社区中发布
  - ...

根据参与开源的类型，一个典型的开源项目有以下几种参与人员：

- **Author**: 创建项目的个人或组织
- **Owner**: 项目拥有者，跟 **Author** 不一定相同。
- **Maintainers**: 负责推动项目的发展和计划实现，也有可能是 **Author** 或 **Owner**。
- **Contributors**: 任何对项目作出贡献的人员。
- **Community Members**: 任何使用该项目的人员。

自己创建开源项目不难，但是创建个好项目比较难：

1. 熟悉需要解决的问题
2. 理解现有轮子的利弊
3. 有能力做更好的轮子

而且是真的需要精力维护的，一开始没什么人用的话，自己也很难保证持续的维护迭代。为此，我优先考虑参与别人的项目。

工作前两年，我之前一直是 **Community Members**，基于工作所需的技术栈，使用了不少第三方轮子，比如 react、vue、ant-design、iview、element-ui、axios 等。一直作为使用者，想做点什么贡献，但又不知道怎么贡献。原因有几个：

- 像 react、vue、ant-design 这些知名仓库，由于工作踩到的坑以及自身能力问题，没能提上 pr。
- 工作之外的轮子接触得很少，不知道有哪些仓库可以贡献的。
- 自身时间精力安排不够，觉得参与开源项目需要大量的时间精力。

万事开头难，踏出第一步很重要。于是我去 github 上找了带有标签类似 `help wanted` 、`bug` 之类的项目，下载下来才发现难以下手，主要是因为这个项目自己压根没用过，要进行提 pr 太难。

我也去了以下各个网站搜索：

- GitHub Explore
- Open Source Friday
- First Timers Only
- CodeTriage
- 24 Pull Requests
- Up For Grabs
- Contributor-ninja
- First Contributions
- SourceSort

直到我发现这个仓库 [First Contributions]( https://github.com/firstcontributions/first-contributions)，这个仓库的目的就是让成功提交一个 pr，熟悉了基本的开源协作流程。后来，也为社区做了点贡献，给 30-seconds-of-code 的 `recordAnimationFrames`修复个 bug，主要是那时候刚好研究 `recordAnimationFrame` 的动画使用以及给 vue-cli 补充文档说明。在补充基础知识时，也给 [zh.javascript.info ](https://github.com/javascript-tutorial/zh.javascript.info)、https://github.com/febobo/web-interview 等仓库做了贡献。慢慢地，我养成了一种习惯，对于使用过的仓库，只要发现有问题，我都会主动提 issue、提 pr，觉得是顺手的事情。

比如商业项目使用开源软件需要做好技术调研，避免开源协议之类的风险。

又比如关于如何有效地反馈，需要提供相关的背景信息、复现步骤或demo、报错截图、已经尝试过的方案等，其实在做这些事情的过程很可能就自己找到了答案。

有不少挑战的，对于程序员来说，有挑战才不会厌倦，才能保持持续的冲劲。

### 对 devui 的建议

组件规范

可以像看看负责的组件，对ng版本有哪些意见，自己又改了哪些东西，说出来让大家判断ng的是否合理，自己私改的功能又是否合理，后面又该如何改，需要增加删减哪些功能，然后把自己的文档拿出来介绍，让别人看看文档是否全面，功能是否涵盖且有案例，简单易懂，又用到了其他田/主的哪些组件，遇到的问题和发现的代码牛逼之处，都可以说，最后还是得整体检视一下整个项目，比如刚说的规范问题，主题的运用，遇到的bug问题什么的

**技术栈**

**技术文章和源码讲解。文章或直播**

**技术栈：vue3**

## 未来规划

## 关于 DevUI

## 小结

战略上的、战术上的

微前端

，包括参与开源的初心、实现的途径以及参与 「Devui 开源组件库」的一些感想。

- 当你没有能力或者没有想法构建一个新的轮子时，积极参与贡献别人的轮子是个很好参与开源的方法。
- commiter

>  关于 DevUI 的故事，可以看 [DevUI开源的故事](https://juejin.cn/post/7029092585452863525)

## 参考资料

- [【译】如何为开源软件做出贡献](https://juejin.im/post/5e30dff75188254c257c48d9?utm_source=gold_browser_extension)
- [A Guide for Contributing to Any Open Source JavaScript Project Ever 💛](https://dev.to/saurabhdaware/a-guide-for-contributing-to-any-open-source-javascript-project-ever-hi)



