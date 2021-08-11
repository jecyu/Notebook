// runs in browser only
// The client entry simply creates the app and mounts it to the DOM

import { createApp } from "./app";

// client-specific bootstrapping logic...

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  // We initialize the store state with the data injected from the server
  store.replaceState(window.__INITIAL_STATE__);
}

// it is still necessary to use router.onReady on both server and client before returning / mounting the app, because the router must resolve async route components ahead of time in order to properly invoke in-component hooks
router.onReady(() => {
  app.$mount("#app"); // this assumes App.vue template root element has `id="app"`
  //如果 #app 具有data-server-rendered="true"，表明获得的文件是服务端渲染的，则客户端会以混合的方式挂载。
});
