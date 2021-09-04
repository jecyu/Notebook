// 1. 设置 v-throtter 自定义指令来实现

export default {
  // TODO 排查不起作用
  bind: (el, binding) => {
    let throttleTime = binding.value; // 防抖时间
    if (!throttleTime) {
      // 用户若不设置防抖时间，则默认2s
      throttleTime = 2000;
    }
    let cbFun;
    el.addEventListener(
      "click",
      (event) => {
        if (!cbFun) {
          // 第一次执行
          cbFun = setTimeout(() => {
            cbFun = null;
          }, throttleTime);
        } else {
          console.log("event->");
          event && event.stopImmediatePropagation();
        }
      },
      true
    );
  },
  // bind: (el, binding) => {
  //   console.log("bind ->");
  //   let throttleTime = binding.value; // 防抖时间
  //   if (!throttleTime) {
  //     // 用户若不设置防抖时间，则默认 2s
  //     throttleTime = 2000;
  //   }
  //   let cbFun;
  //   el.addEventListener(
  //     "click",
  //     (event) => {
  //       debugger;
  //       if (!cbFun) {
  //         // 第一次执行
  //         cbFun = setTimeout(() => {
  //           cbFun = null;
  //           clearTimeout(cbFun);
  //         }, throttleTime);
  //       } else {
  //         event && event.stopImmediatePropagation(); // 阻止事件冒泡，这里的防抖就很特别，以事件的转发作为防抖，这样外面就不用再处理防抖
  //       }
  //     },
  //     true // 捕获阶段
  //   );
  // },
};

// 2.为button标签设置v-throttle自定义指令
{
  /* <button @click="sayHello" v-throttle>提交</button> */
}
