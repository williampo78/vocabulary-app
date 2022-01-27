<template>
  <div class="favorite">
    <h1>我的收藏</h1>
    <Cards />
  </div>
</template>

<script>
import Cards from "../components/Cards.vue";
export default {
  components: { Cards },
};
</script>

<style lang="scss">
.favorite {
  width: 100%;
  h1 {
    text-align: start;
  }
}
</style>