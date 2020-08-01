/*
 * @Description: 计算树节点的孩子数量
 * @Author: Jecyu
 * @Date: 2020-07-30 13:23:42
 * @LastEditTime: 2020-08-01 17:34:03
 * @LastEditors: Jecyu
 */

// 第一步：使用 hasChildNumbers 假设已经计算好了 hasChilds 这一步
const tree = [
  {
    name: "1",
    // hasChildNumbers: 2,
    children: [
      {
        // hasChildNumbers: 0,
        name: "1-1",
      },
      {
        // hasChildNumbers: 0,
        name: "1-2",
      },
    ],
  },
  {
    name: "2",
    // hasChildNumbers: 3 + 1 + 1 + 1, // hasChildNumbers + 本身的节点数
    children: [
      {
        name: "2-1",
        // hasChildNumbers: 3,
        children: [
          {
            // hasChildNumbers: 0,
            name: "2-1-1",
          },
          {
            // hasChildNumbers: 0,
            name: "2-1-2",
          },
          {
            // hasChildNumbers: 0,
            name: "2-1-3",
          },
        ],
      },
      {
        name: "2-2",
        // hasChildNumbers: 1,
        children: [
          {
            // hasChildNumbers: 0,
            name: "2-1-3",
          },
        ],
      },
    ],
  },
];

// 临时的想法：刷新 hasNumbers 的值，先刷新最里面的值，再一层层往外刷新，找到它的父亲
// 暂时分成两个步骤
// 第一步：获得 hasNumbers
// function transerverTree(arr, callback) {
//   // let hasChildNumbers = 0;
//   arr.forEach((item) => {
//     // hasChildNumbers++;
//     // callback(item); // item.hasChildNumbers++
//     if (item.children) {
//       item.hasDirectChildNumbers = item.children.length;
//       transerverTree(item.children);
//     } else {
//       item.hasDirectChildNumbers = 0;
//     }
//   });
//   // return hasChildNumbers;
//   return arr;
// }

// const result = transerverTree(tree);
// console.log(result);
// 第二步：刷新 hasNumbers 的值，先刷新最里面的值，再一层层往外刷新，找到它的父亲
// function transerverTree2(arr) {
//   arr.forEach((item) => {
//     if (item.children) {
//       transerverTree(item.children);
//     } else {

//     }
//   });
// }

// 第三步：思路是细化到每一步，例如计算 f(1) = (f(1-1) + ) + (f(1-2) + 1)
// 方法2：暴力计算，之后再考虑优化重复计算的值
// 这个是思路获得进行抽象，对每个树的节点进行数学化思维处理。
// f(tree) = f(1) + f(2) + f(3)
//         = (f(1-1)+1) + (f(1-2)+1) + (f(2-1) + 1) + (f(2-2)+1) + (f(3)+1)
// 不计算父节点，只需判断不是叶子节点，把本身的计数去掉
// f(tree) = f(1) + f(2) + f(3)
//         = (f(1-1)+1) + (f(1-2)+1) + (f(2-1) + 1) + (f(2-2)+1) + (f(3)+1) = (f(1)-1) + (f(2)-1) + f(3)
function getChilds(node, isIncludeParent) { // 1
  let hasChilds = 0;
  if (node.children) { // 1
    node.children.forEach((node) => {
      // 1-1 // 1-2
      hasChilds += getChilds(node, isIncludeParent) + 1;
      // if (!isIncludeParent && node.children) { // 非叶子节点，把本身的计数去掉
      //   hasChilds--;
      // }
    });
    return hasChilds;
  } else { // 无孩子
    return hasChilds;
  }
}
// 不计算 hasChilds，计算叶子的数量

// 遍历 + 递归搞掂，遍地的递归，以及 getChilds 的递归
function transerverTree(arr, callback) {
  arr.forEach((item) => {
    callback(item);
    item.hasChilds = getChilds(item, true);
    if (item.children) {
      transerverTree(item.children, callback);
    }
  });
  return arr;
}

const result = transerverTree(tree, (item) => {
  item.hasChilds = getChilds(item, true);
});
console.log(result);
