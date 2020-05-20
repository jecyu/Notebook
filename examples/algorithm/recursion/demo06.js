/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-05-20 15:59:53
 * @LastEditTime: 2020-05-20 23:36:35
 * @LastEditors: Jecyu
 */
const traverseTree1 = (node, callback, parentNode) => {
  if (node === null) {
    return;
  }
  callback && callback(node, parentNode);

  if (node.children && node.children.length > 0) {
    const children = node.children;
    for (let i = 0; i < children.length; i++) {
      node && traverseTree1(children[i], callback, node);
    }
  }
};

/**
 * @description: 遍历树
 * @param {Object} node
 * @param {Function} callback
 * @param {Object} parentNode
 * @return: null
 */
const traverseTree2 = (node, callback, parentNode) => {
  if (node === null) {
    return;
  }
  callback && callback(node, parentNode);

  if (node.children && node.children.length > 0) {
    const children = node.children;
    for (let i = 0; i < children.length; i++) {
      if (node) {
        // 返回一个新的函数
        return traverseTree2.bind(null, children[i], callback, node); // 不能简单这样处理，这样就跳出循环了。只处理了一层结构
        // 没有堆栈的情况下，树无法通过单个循环处理
      }
    }
  }
};

const traverseTree3 = (node, callback, parentNode) => {
  const _traverse = () => {
    return function() {
      if (node === null) {
        return;
      }
      callback && callback(node, parentNode);
    
      if (node.children && node.children.length > 0) {
        const children = node.children;
        for (let i = 0; i < children.length; i++) {
          if (node) {
            // 返回一个新的函数
            _traverse(children[i], callback, node); 
          }
        }
      }
    }
  }
  trampoline(_traverse);
};

// 需要把节点记录下


function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}

const option = {
  title: "parent 1",
  children: [
    {
      title: "parent 1-1",
      expand: true,
      children: [
        {
          title: "leaf 1-1-1",
        },
        {
          title: "leaf 1-1-2",
        },
      ],
    },
    {
      title: "parent 1-2",
      children: [
        {
          title: "leaf 1-2-1",
        },
        {
          title: "leaf 1-2-2",
        },
      ],
    },
  ],
};

// trampoline(
//   // trampoline
//   traverseTree2(option, (node) => {
//     console.log("node =>", node.title);
//   })
// );

traverseTree3(option, (node) => {
  console.log("node =>", node.title);
});

// 版本2： 解决循环跳出的问题，但写得受罪，调试难受。
// function tco(f) {
//   var value;
//   var active = false;
//   var accumulated = [];

//   return function accumulator() {
//     accumulated.push(arguments); // 每次都推入新的参数
//     if (!active) { // active 控制每次入栈一次，又出栈。避免递归调用
//       active = true;
//       while (accumulated.length) { // 跳出循环条件,，在if 语句外面会动态添加该参数
//         value = f.apply(this, accumulated.shift()); // 执行函数，只要返回是函数，都会跳出去
//       }
//       active = false;
//       return value;
//     }
//     // else 的话，跳动的递归上一层 aaa 函数，这样就不会出现层层递归入栈，相当于一种及时抽身的感觉。
//   };
// }
// /// 虽然可以避免爆栈，但是这种写法很难受
// const tcoTailFactorial = tco(function traverseTree(node, callback, parentNode) {
//     if (node === null) {
//       return;
//     }
//     callback && callback(node, parentNode);

//     if (node.children && node.children.length > 0) {
//       const children = node.children;
//       for (let i = 0; i < children.length; i++) {
//         if (node) {
//           tcoTailFactorial(children[i], callback, node);
//            // 不 return 出去，直接执行，避免跳出循环
//         }
//       }
//     }
// });

// console.time("normal")
// traverseTree(option, (node) => {
//   console.log("node =>", node.title);
// })
// console.timeEnd("normal") // ~16ms

// console.time("tcoTailFactorial")
// tcoTailFactorial(option, (node) => {
//   console.log("node =>", node.title);
// })

// console.timeEnd("tcoTailFactorial") // ~2.2
