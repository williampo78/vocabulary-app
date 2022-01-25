<template>
  <div id="app">
    <Header />
    <router-view class="view" />
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
import { doc } from "@firebase/firestore";
export default {
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("scroll", () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}px`
      );
    });
  },
  components: { Header, Footer },
  methods: {
    closeOverlay() {
      this.$store.commit("OVERLAY", false);
      this.$store.commit("CALL_POPUP", null);
    },
    editCard(obj) {
      console.log(obj);
    },
  },
  computed: {
    getOverlayStatus() {
      return this.$store.state.overlay;
    },
  },
  watch: {
    getOverlayStatus() {
      if (this.$store.state.overlay) {
        const scrollY =
          document.documentElement.style.getPropertyValue("--scroll-y");
        const body = document.body;
        body.style.position = "fixed";
        body.style.top = `-${scrollY}`;
      } else {
        const body = document.body;
        const scrollY = body.style.top;

        body.style.position = "";
        body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
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
  list-style-type: none;
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
    height: 100%;
    background: rgba(114, 114, 114, 0.6);
    z-index: 1;
  }
}
</style>
