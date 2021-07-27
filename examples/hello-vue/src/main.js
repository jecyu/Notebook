import Vue from 'vue'
import App from './App.vue'


import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  Vue,
  dsn: "http://e52c0d1367f04f179a59157a3968a120@localhost:9000/2",
  integrations: [new Integrations.BrowserTracing()],
  logErrors: true,
  release: "pro@1.0.1",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
