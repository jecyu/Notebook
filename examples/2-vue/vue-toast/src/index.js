import toastComponent from "./toast.vue";

const Toast = {};

let $vm; // 存储 Vue 实例

Toast.install = function(Vue, options) {
  // 不重复
  if (Toast.installed) return;
  Toast.installed = true;
  // 挂载 $toast 到 Vue 的原型链中
  // 后续只需要通过 this.$toast 即可使用
  // 传递了四个参数
  // message 展示的内容
  // duration 时长
  // callback 关闭时的回调函数
  // config 暂时无用
  console.log(options);
  function createToast(message, duration, callback, config) {
    console.log(config);
    // 使用 Vue.extend 创建一个子类
    let Ext = Vue.extend(toastComponent);
    if (!$vm) {
      $vm = new Ext({
        el: document.createElement("div"),
      });
    }

    // 给对象赋值
    $vm.message = message || "message";
    $vm.duration = duration || 2500;
    $vm.show = true;

    // 挂载到 dom 中
    document.body.appendChild($vm.$el);

    // 延时消失
    setTimeout(() => {
      $vm.show = false;
      typeof callback === "function" && callback();
    }, $vm.duration);
  }
  Vue.prototype.$toast = createToast;
  // Object.defineProperty(Vue.prototype, toast, {
  //   get: function() {
  //     return toast;
  //   }
  // })
};

export default Toast;
