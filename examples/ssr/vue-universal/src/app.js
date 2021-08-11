// universal entry

import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createStore } from "./store";
import { sync } from "vuex-router-sync";

// export a factory function for creating fresh app, router and store instances
export function createApp() {
  // create router instance and store instances
  const router = createRouter();
  const store = createStore();

  sync(store, router); // sync so that route state is available as part of the store

  // the root instance simply renders the App component.
  const app = new Vue({
    // injecting both the router and the store into Vun instance
    router,
    store,
    render: (h) => h(App),
  });
  return { app, router, store }; // expose the app, the router and the store.
}
