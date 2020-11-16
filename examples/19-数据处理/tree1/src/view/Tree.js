/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-05-26 15:11:24
 * @LastEditTime: 2020-05-29 23:14:39
 * @LastEditors: Jecyu
 */

// mvc
// 原型：先渲染树，展开、收缩。
// 后续 checkbox，增删改查、上下移动、拖拽
// 把数据与视图分离开
// new Tree({data: []}).mount("#container")
// const new Tree({data}).init()
// init
// 思路：
// 1. view：所有的模版都实现创建，树的容器、树节点
// ```html
// <ul class="tiny-tree">  //
//   <li class="tiny-tree-node">
//     <div class="tiny-tree-node-content"></div>
//     <ul class="tiny-tree-node-children"></ul>  <!-- 孩子节点-->
//   </li>
// </ul>
// </div>
// ```

// initState model 存储数据
// render view +（包括 bindEvent）
// 外部 controller 触发事件
// 引入样式
import "../styles/index.css";
import TreeModel from "../model/TreelModel";
// import Node from "../view/Node";
import { createDOMFromString } from "../utils/base";
const prefix = "easy-tree";
export default class EasyTree {
  constructor(prop) {
    // 传入配置，初始化
    this.defaultOpt = {
      baseNode: null,
      paddingLeft: 16,
      data: [],
    };
    this.opts = Object.assign(this.defaultOpt, prop);
    this.init(); // 初始化
    this.prefix = "easy";
  }
  init() {
    this.initState().render();
  }
  initState() {
    // 实例化 TreeStore，存储数据
    this.treeModel = new TreeModel(this.opts.data);
    this.roots = this.treeModel.getTreeRoot();
    return this;
  }
  render() {
    // 渲染树
    // <ul class="easy-tree">
    // new TreeNode() 渲染
    // </ul>
    this.treeWrapperDom = createDOMFromString(`<ul class="${prefix}"></ul>`);
    // const treeNode = new node(this.root).render();
    this.roots.forEach((nodeModel) => {
      // 遍历渲染
      const treeNode = this.renderTreeNode(nodeModel);
      this.treeWrapperDom.appendChild(treeNode); // 添加进根节点
    });
    this.opts.baseNode.appendChild(this.treeWrapperDom); // 渲染完成再添加进 web 浏览器，添加到外部容器
    
    // 给 ul 容器添加事件，给每个节点分配 id，然后点击事件的时候，通过 id 寻找对应的 nodeData，进行属性值的更改，如 expand、visiable等。
    this.bindEvent();
    return this;
  }
  renderTreeNode(nodeModel) {
    // 递归渲染
    // 调用 TreeNode.render() 获得渲染的值
    // <li>
    //   <div class="easy-tree-node-content"></div>
    //   {renderChildren}
    // </li>
    const li = `<li class="${prefix}-node"></li>`; // 节点模版
    const liDom = createDOMFromString(li);
    const nodeContentDom = this.renderSeletor(nodeModel);
    liDom.appendChild(nodeContentDom);

    if (nodeModel.hasChild()) {
      // 递归孩子
      const nodeModels = nodeModel.getChildNodes();
      liDom.appendChild(this.renderChildren(nodeModels, nodeModel));
    }
    // const { visible } = nodeModel;
    // if (!visible) {
    //   // 是否可见，后续再状态同步处理，目前只是抽离 Model 层
    //   liDom.style.display = "none";
    // } else {
    //   liDom.style.display = "block";
    // }
    return liDom;
  }
  renderChildren(nodeModelList, nodeModel) {
    // renderTreeNode
    // <ul class="easy-tree-node-children">
    // {renderTreeNode}
    // {renderTreeNode}
    // </ul>
    const ul = `<ul class="${prefix}-node-children"></ul>`;
    const ulDom = createDOMFromString(ul);
    // 添加 expand attribue 和 显示、隐藏
    const { expand } = nodeModel;
    if (expand) {
      ulDom.style.display = "block";
    } else {
      ulDom.style.display = "none";
    }
    nodeModelList.forEach((node) => {
      ulDom.appendChild(this.renderTreeNode(node)); // 递归渲染
    });
    return ulDom;
  }

  /**
   * 渲染节点 name 和 icon
   */
  renderSeletor(nodeModel) {
    const { name, expand, id } = nodeModel;
    const title = `<span class="${prefix}-node-title">${name}</span>`;
    const titleDom = createDOMFromString(title);
    const div = `<div class="${prefix}-node-content"></div>`; 
    const divDom = createDOMFromString(div);
    let icon = null;
    // 文件夹和文件显示不同的 icon
    if (nodeModel.hasChild()) {
      // 文件夹还需要区分展开和收缩
      if (expand) {
        divDom.setAttribute("expand", "true");
        icon = `<span class="${prefix}-node-icon iconfont cl-icon-unfold"></span>`;
      } else {
        icon = `<span class="${prefix}-node-icon iconfont cl-icon-fold"></span>`;
        divDom.setAttribute("expand", "false");
      }
    } else {
      // 文件
      icon = `<span class="${prefix}-node-icon"></span>`;
    }
    const iconDom = createDOMFromString(icon);
    // iconDom.id = id; // 记录 id属性
    iconDom.setAttribute("action", "expand")
    divDom.appendChild(iconDom);
    divDom.appendChild(titleDom);
    return divDom;
  }

  expandCollapseNode(evt) {
    // const id = evt.target.id;
    // TODO 后续同步改变 model 状态，然后由数据驱动更新视图，把记录状态从 attribute 抽离出来。
    // this.treeModel.setChildNodeVisible(id); // 同步子节点的 visible 状态

    // 直接改变 dom 的展开、收缩
    // 找到当前节点 dom 的父亲的兄弟元素，进行显示处理，这里不得不使用 attribute 同步记录模版状态的管理，这样在渲染的时候也需要记录 expand
    // attribue 到这样后续维护困难，目前没有用上 model 的状态驱动 view 的展开、收缩更新。 
    const e = evt || window.event;
    const target = e.target || e.srcElement;
    if (target.getAttribute("action") && target.getAttribute("action") === "expand") {
      const tagName = target.tagName.toLowerCase();
      let treeNodeCon = tagName === "div" ? target : target.parentNode;
      if (!treeNodeCon.classList.contains(`${prefix}-node-content`) || !treeNodeCon.getAttribute("expand")) return;
      let childrenDom = treeNodeCon.nextElementSibling;
      if (treeNodeCon.getAttribute("expand") === "false") {
        treeNodeCon.firstChild.classList.remove("cl-icon-unfold");
        treeNodeCon.setAttribute("expand", "true");
        childrenDom.style.display = "block";
      } else {
        treeNodeCon.firstChild.classList.add("cl-icon-unfold");
        childrenDom.style.display = "none";
        treeNodeCon.setAttribute("expand", "false");
      }
    }
    // TODO 后续看看是否需要通过 model 改变来更新视图，但是要做好 virtual DOM 优化，当前的基本展开与收缩没必要，后续需要drop、等再考虑
  }
  bindEvent() {
    this.treeWrapperDom.addEventListener(
      "click",
      this.expandCollapseNode.bind(this),
      false
    );
    return this;
  }
  unbindEvent() {
    this.treeWrapperDom.removeEventListener(
      "click",
      this.onNodeExpand.bind(this),
      false
    );
  }

  destroy() {
    // 移除树
    this.opts.baseNode.removeChild(this.treeWrapperDom);
    // 移除事件监听
    this.unbindEvent();
  }
}
