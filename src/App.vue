<template>
  <div id="app">
    <Header />
    <router-view @edit="editCard($event)" class="view" />
    <Footer />
    <div
      @click="closeOverlay"
      v-if="$store.state.overlay == true"
      class="overlay"
    ></div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  data() {
    return {
      edit: false,
    };
  },
  components: { Header, Footer },
  methods: {
    closeOverlay() {
      this.$store.commit("OVERLAY", false);
    },
  },
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
  .overlay {
    position: absolute;
    width: 100%;
    height: 100vh;
    background: rgba(114, 114, 114, 0.6);
    z-index: 1;
  }
}
</style>
