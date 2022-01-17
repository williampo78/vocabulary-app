<template>
  <div class="layout">
    <div class="links">
      <router-link to="/learn">我的主頁</router-link>
      <router-link to="/learn">單字學習</router-link>
      <router-link to="/about">建立單字卡</router-link>
      <router-link to="/about">我的收藏</router-link>
    </div>
    <!-- <Learn /> -->
  </div>
</template>

<script>
import Learn from "../views/Learn.vue";
export default {
  components: { Learn },
};
</script>

<style lang="scss">
.layout {
  width: 100%;
  display: flex;
  .links {
    width: 400px;
    height: 600px;
    background: #ed9568;
  }
}
</style>