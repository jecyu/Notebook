<!--
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-05-26 15:31:50
 * @LastEditTime: 2020-05-29 15:04:00
 * @LastEditors: Jecyu
--> 
原生 JS 树，非响应式。
- 遵循 MVC 
  
这里把 view 里的数据也抽离到 model 里保存，常见的 vue 组件，是把 model（data） 等信息组合到 view 里面的，一个个组件。如 iview。但是没有把 model 严格区分开来。 一个单文件组件里面也有自己的 view 逻辑。这样会搞混。

这里的 V （融合了 View + Controller），数据维护统一在 Model

## 性能

## 参考资料

- zTree、elementTree、JTree、IviewTree、simpleTree、antd-tree、
- [jstree](https://github.com/vakata/jstree)
- [主题：遵循MVC模式，效仿 JTree思想，用 javascript 实现树形结构教程](https://www.iteye.com/topic/214193)
- [zTree -- jQuery 树插件](http://www.treejs.cn/v3/main.php#_zTreeInfo)
- [Data Structures With JavaScript: Tree](https://code.tutsplus.com/articles/data-structures-with-javascript-tree--cms-23393)
- [vue项目中引入iconfont](https://juejin.im/post/5d25bca351882557d44c8a85#heading-10)
- [33行代码的React](https://mp.weixin.qq.com/s/pjCm2EBGlWlRo7U-Z-2kYg)