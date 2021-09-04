/**
 * 设置一个 v-lazy 自定义组件完成图片懒加载
 * 图片懒加载其实就是延迟加载。也就是不用一次性加载所有的图片，等到用户需要某张图片的时候再加载，这样可以避免在同一时间请求大量的数据。也就是当图片滚动到可视区域的时候再去加载图片。
 * 如果使用scroll事件来判断图片可见或不可见，每次需要重新计算的几十个图像，显然使用IntersectionObserver更加优雅。不兼容 IE。生产环境也可以下载 polyfill
 */

// 代替图片的 loading 图
let defaultSrc =
  "https://tva1.sinaimg.cn/large/007S8ZIlgy1gfyof9vr4mj3044032dfl.jpg";

const LazyLoad = {
  // 钩子函数-第一次绑定
  bind(el, { value }) {
    LazyLoad.init(el, value, defaultSrc);
  },
  // 钩子函数-插入父节点
  inserted(el) {
    // 兼容处理
    if ("IntersectionObserver" in window) {
      LazyLoad.observe(el);
    } else {
      // 使用传统方案监听元素是否进入可视区域
      LazyLoad.listenerScroll(el);
    }
  },
  // 初始化
  init(el, val, defaultSrc) {
    // data-src 存储真实 src
    el.setAttribute("data-src", val);
    // 设置 src 为 loading 图
    el.setAttribute("src", defaultSrc);
  },
  // 利用 IntersectionObserver 监听 el
  observe(el) {
    let io = new IntersectionObserver((entries) => {
      let realSrc = el.dataset.src;
      if (entries[0].isIntersecting) {
        // 进入可视区域
        if (realSrc) {
          el.src = realSrc;
          el.removeAttribute("data-src");
        }
      }
    });
    io.observe(el);
  },
  // 监听 scroll 事件
  listenerScroll(el) {
    let handler = LazyLoad.throttle(LazyLoad.load, 300);
    LazyLoad.load(el);
    window.addEventListener("scroll", () => {
      handler(el);
    });
  },
  // 加载真实图片
  load(el) {
    let realSrc = el.dataset.src;
    // 位于可视区域内
    if (LazyLoad.isVisible(el)) {
      el.src = realSrc;
      el.removeAttribute("data-src");
    }
  },
  // 计算是否位于可视区域
  isVisible(el) {
    let coords = el.getBoundingClientRect(); // https://github.com/zuopf769/notebook/blob/master/fe/%E4%BD%A0%E7%9C%9F%E7%9A%84%E4%BC%9A%E7%94%A8getBoundingClientRect%E5%90%97/README.md
    let windowHeight = document.documentElement.clientHeight;
    // 顶部元素边缘可见吗？
    let topVisible = coords.top > 0 && coords.top < windowHeight;
    // 底部元素边缘可见吗？
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
    return topVisible || bottomVisible;
  },
  // 节流
  throttle(func, ms) {
    let isThrotted = false;
    let savedArgs = null;
    let savedThis = null;
    function wrapper(...args) {
      if (isThrotted) {
        // 锁住直接返回
        savedArgs = args; // 并记录被冷却的参数
        savedThis = this;
        return;
      }

      func.apply(savedThis, savedArgs); // 1. 执行 func，满足首次的执行

      // 2. 启动一个分片
      setTimeout(() => {
        isThrotted = false; // 2.1 够钟解锁
        if (savedArgs) {
          // 有被冷却的参数，才进行执行。
          wrapper.apply(savedThis, ...savedArgs); // 2.2 继续调用 wrapper
          savedThis = savedArgs = null;
        }
      }, ms);

      // 3. 启动分片定时器后，在这里进行锁住
      isThrotted = true;
    }
    return wrapper;
  },
};

export default LazyLoad;
