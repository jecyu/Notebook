/**
 * Note similar to createApp, we also need a fresh router instance for each request, so the file exports a createRouter function
 */

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    routers: [
      { path: "/", component: () => import("./components/Home.vue") },
      { path: "/item/:id", component: () => import("./components/Item.vue") },
    ],
  });
}
