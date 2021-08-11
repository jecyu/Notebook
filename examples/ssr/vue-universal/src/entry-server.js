// runs on server only

/**
 * The server entry uses a default export which is a function that can be called repeatedly for each render. At this moment, it doesn't do much other than creating and returning the app instance - but later we will perform server-side route matching and data pre-fetching logic here
 */

import { createApp } from "./app";

export default (context) => {
  // since there could potentially be asynchronous route hooks or components,
  // we will be returning a Promise so that the server can wait until
  // everything is ready before rendering.
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    // set server-side router's location
    router.push(context.url); // 动态设置 url，渲染对应的路由组件

    // wait until router has resolved possible async components and hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();

      // no matched routes, reject with 404
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      // This `rendered` hook is called when the app has finished rendering
      context.rendered = () => {
        // After the app is rendered, our store is now
        // filled with the state from our components.
        // When we attach the state to the context, and the `template` option
        // is used for the renderer, the state will automatically be
        // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
        context.state = store.state;
      };

      // the Promise should resolve to the app instance so it can be rendered
      resolve(app);
    }, reject);
  });
};
