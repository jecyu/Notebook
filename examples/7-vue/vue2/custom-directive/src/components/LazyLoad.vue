<template>
  <div class="hello">
    <ul>
      <li v-for="(item, index) in imageItems" :key="index">
        <img v-lazy="item" width="100%" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LazyLoad",
  props: {},
  data() {
    return {
      imageItems: [
        "https://tva1.sinaimg.cn/large/007S8ZIlgy1gfynwi1sejj30ij0nrdx0.jpg",
        "https://tva1.sinaimg.cn/large/007S8ZIlgy1gfynwi1sejj30ij0nrdx0.jpg",
        "https://tva1.sinaimg.cn/large/007S8ZIlgy1gfynwi1sejj30ij0nrdx0.jpg",
        "https://tva1.sinaimg.cn/large/007S8ZIlgy1gfynwi1sejj30ij0nrdx0.jpg",
        "https://tva1.sinaimg.cn/large/007S8ZIlgy1gfynwi1sejj30ij0nrdx0.jpg",
        "https://tva1.sinaimg.cn/large/007S8ZIlgy1gfynwi1sejj30ij0nrdx0.jpg",
        "https://tva1.sinaimg.cn/large/007S8ZIlgy1gfynwi1sejj30ij0nrdx0.jpg",
        "https://tva1.sinaimg.cn/large/007S8ZIlgy1gfynwi1sejj30ij0nrdx0.jpg",
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
