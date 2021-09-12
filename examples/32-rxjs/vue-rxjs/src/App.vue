<template>
  <img alt="Vue logo" src="./assets/logo.png" />
</template>

<script>
import { fromEvent } from "rxjs";
import { throttleTime, scan, map } from "rxjs/operators";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    // fromEvent(document, "click").subscribe(() => console.log("Clicked!"));
    // fromEvent(document, "click")
    //   .pipe(scan((count) => count + 1, 0))
    //   .subscribe((count) => console.log(`Clicked ${count} times`));

    // fromEvent(document, "click")
    //   .pipe(
    //     throttleTime(1000),
    //     scan((count) => count + 1, 0)
    //   )
    //   .subscribe((count) => console.log(`Clicked ${count} times`));

    fromEvent(document, "click")
      .pipe(
        throttleTime(1000),
        map((event) => event.clientX),
        scan((count, clientX) => count + clientX, 0)
      )
      .subscribe((count) => console.log(count));
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
