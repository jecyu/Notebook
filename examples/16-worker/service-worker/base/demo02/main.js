/*
 * @Author: Jecyu
 * @Date: 2020-11-11 08:12:32
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-11 22:02:23
 * @FilePath: /examples/16-worker/service-worker/base/demo02/main.js
 * @Description:
 */

if ("serviceWorker" in navigator === true) {
  window.addEventListener("load", async function() {
    const SW_URL = "./sw.js";
    const options = {};
    // register function on serviceWorker downloads the service worker script from URL SW_URL and executes it
    // This returns a promise p which resolves if service worker file is downloaded and executed successfully.
    try {
      const registration = await navigator.serviceWorker.register(SW_URL, [
        options,
      ]);
      console.log(
        "Service worker successfully registered on scope",
        registration.scope
      );
    } catch (err) {
      console.log("Service worker failed to register");
    }
  });
}


