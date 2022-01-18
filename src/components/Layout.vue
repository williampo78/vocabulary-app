<template>
  <div class="layout">
    <div class="sidebar">
      <div>
        <p>William Chou</p>
      </div>
      <router-link :to="{ name: 'Home' }">我的主頁</router-link>
      <router-link to="/learn">單字學習</router-link>
      <router-link to="/about">建立單字卡</router-link>
      <router-link to="/about">我的收藏</router-link>
    </div>
    <router-view />
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
  margin-top: 60px;
  width: 100%;
  display: flex;
  .sidebar {
    min-width: 350px;
    height: 700px;
    background: #ed9568;
    display: flex;
    flex-direction: column;
    border-radius: 0px 35px 35px 0px;
    div {
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 80px;
      font-size: 22px;
      font-weight: bold;
      color: #000;
    }
  }
}
</style>