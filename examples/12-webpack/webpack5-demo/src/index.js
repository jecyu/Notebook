// import _ from "lodash";

// import { cube } from "./tree-shaking";

// 类的处理
// import Util from "./util"; // 类的 tree-shaking 处理

// let util = new Util();
// let result1 = util.hello();
// console.log(result1);

// 方法调用带来的副作用
import { hello, bye } from "./util";
let result1 = hello();
let result2 = bye();
console.log(result1);

// 副作用

// function component() {
//   // const element = document.createElement("div");
//   // element.innerHTML = _.join(["Hello", "webpack"]);

//   const element = document.createElement("pre");
//   element.innerHTML = ["Hello webpack", "5 cubed is equal to " + cube(5)].join(
//     "\n\n"
//   );
//   return element;
// }

// document.body.appendChild(component());
