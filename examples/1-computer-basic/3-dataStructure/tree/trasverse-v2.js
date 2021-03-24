/*
 * @Author: Jecyu
 * @Date: 2021-02-22 15:30:58
 * @LastEditors: Jecyu
 * @LastEditTime: 2021-02-23 16:46:15
 * @FilePath: /examples/18-dataStructure/tree/trasverse2.js
 * @Description: 树的遍历
 */

/**
 * @description: 生成指定深度和每层广度的数据
 * @param {*} deep
 * @param {*} breadth
 * @return {*}
 */

function createData(deep, breadth) {
  var data = {};
  var temp = data;

  for (var i = 0; i < deep; i++) {
    temp = temp["data"] = {};
    for (var j = 0; j < breadth; j++) {
      temp[j] = j;
    }
  }

  return data;
}

// const tree = createData(2, 3); // 2 层深度，每层有 3 个数据
// 先使用特殊的树，再考虑自定义的
let tree = [
  {
    id: "1",
    title: "节点1",
    children: [
      {
        id: "1-1",
        title: "节点1-1",
      },
      {
        id: "1-2",
        title: "节点1-2",
      },
    ],
  },
  {
    id: "2",
    title: "节点2",
    children: [
      {
        id: "2-1",
        title: "节点2-1",
      },
    ],
  },
];
console.log(tree);

// 1. 常见的 js 树：
// - 标准的 JSON 树
// - 特殊树：每个节点都有同一个 children 属性（值可以是对象或数组）
// - 二叉树
// 2. 对于树（图也是）的遍历有：
// - 深度优先遍历（如果是二叉树还分为前序、中序、后序遍历），关键在于「回溯」
// - 广度优先遍历（类似二叉树的层次遍历），关键在于「重放」，使用队列。
// 3. 实现方式有：
// - 递归模式（本身就是基于方法调用栈，可以实现回溯，先入后出）
// - 循环模式
// 4. 额外的优化（使用 hash 表记录已经访问过的节点，可以节省时间）

// ----以深度遍历实现----

function isObject(val) {
  return typeof val === "object" && val != null;
}

// 递归方式，遍历所有的节点
function trasverDFC(node, callback) {
  if (typeof callback !== "function") {
    throw new Error("callback is not function.");
  }
  if (isObject(node)) {
    for (let prop in node) {
      if (Object.prototype.hasOwnProperty.call(node, prop)) {
        if (isObject(node[prop])) {
          trasverDFC(node[prop], callback);
        } else {
          callback(node[prop]);
        }
      }
    }
  }
}

// 循环方式，递归的回溯是通过调用栈，而调用栈回溯到上一个执行上下文是通过 outer 指针，可以参考
// 先序遍历，先父亲，后孩子
function trasverDFC2(tree, callback) {
  let node,
    list = [...tree];
  while ((node = list.shift())) {
    callback(node);
    node.children && list.unshift(...node.children); // 插入到前面
  }
}

// 循环方式，后序遍历，先孩子，后父亲
/**
 * @description: 需要不断将子树扩展到根节点前面去，执行列表遍历，遍历到某个节点如果它没有子节点或者它的子节点已经扩展到它前面了，则执行访问操作，否则扩展子节点到当前节点前面：
 * @param {*} tree
 * @param {*} callback
 * @return {*}
 */
function trasverDFC3(tree, callback) {
  let node,
    list = [...tree],
    i = 0;
  while ((node = list[i])) {
    let childCount = node.children ? node.children.length : 0;
    if (!childCount || node.children[childCount - 1] === list[i - 1]) {
      callback(node);
      i++;
    } else {
      list.splice(i, 0, ...node.children);
    }
  }
}

// 肯定要遍历 prop 属性的，上面这个需要重新考虑如何处理，看看for 循环

// let nodes = [];
// trasverDFC(tree, (node) => nodes.push(node));
// console.log(nodes);

// ----- 以广度遍历实现 ------

// 循环模式，处理参没有 children 标准的树，单纯是遍历所有的节点
function trasverBFC(tree, callback) {
  let node,
    list = Array.isArray(tree) ? [...tree] : { ...tree };
  let i = 0;
  node = list[i];
  while (node != null) {
    // node.children && list.push(...node.children);
    if (isObject(node)) {
      callback(node);
      for (let prop in node) {
        if (isObject(node[prop])) {
          // 相当于上述的写法
          if (Object.prototype.hasOwnProperty.call(node, prop)) {
            list[list.length] = node[prop];
          }
        }
      }
    }
    i++;
    node = list[i];
  }
}

// trasverDFC3(tree, (node) => {
//   console.log(node.title);
// });
trasverBFC(tree, (node) => {
  console.log(node);
});
// trasverDFC(tree, (node) => {
//   console.log(node);
// });

