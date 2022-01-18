<template>
  <div id="app">
    <Header />
    <router-view class="view" />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  components: { Header, Footer },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-family: "Noto Sans TC", sans-serif;
}
#app {
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #f1efee;
  .view {
    margin-bottom: 220px;
  }
}
</style>
