<template>
  <div class="layout">
    <div class="sidebar">
      <div>
        <p>William Chou</p>
      </div>
      <router-link :to="{ name: 'Home' }">我的主頁</router-link>
      <router-link :to="{ name: 'Learn' }">單字學習</router-link>
      <router-link :to="{ name: 'AddWords' }">建立單字卡</router-link>
      <router-link to="/about">我的收藏</router-link>
    </div>
    <router-view />
    <FormContainer v-if="$store.state.overlay == true" class="modify" />
  </div>
</template>

<script>
import FormContainer from "./FormContainer.vue";
export default {
  components: { FormContainer },
};
</script>

<style lang="scss">
.layout {
  position: relative;
  margin-top: 60px;
  width: 100%;
  display: flex;
  padding-right: 60px;
  .sidebar {
    min-width: 350px;
    height: 700px;
    background: #ed9568;
    display: flex;
    flex-direction: column;
    border-radius: 0px 35px 35px 0px;
    margin-right: 60px;
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
    .router-link-exact-active {
      background: #fff;
    }
  }
  .modify {
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    z-index: 5;
  }
}
</style>