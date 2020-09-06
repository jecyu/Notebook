<template>
  <transition>
    <div class="parent" v-if="show">
      <div class="child">{{ message }}</div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "toast",
  data() {
    return {
      message: 'message',
      show: false
    }
  }
}
</script>