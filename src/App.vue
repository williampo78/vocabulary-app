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
import { colRef, orderBy, query, onSnapshot, where, auth } from "./firebase";
export default {
  data() {
    return {};
  },
  created() {
    if (auth.currentUser) {
      const q = query(
        colRef,
        where("userId", "==", auth.currentUser.uid),
        orderBy("time", "desc")
      );
      onSnapshot(q, (snapshot) => {
        let cards = [];
        snapshot.docs.forEach((doc) => {
          cards.push({ ...doc.data(), id: doc.id });
        });
        this.$store.commit("GET_WORDS", cards);
        console.log("On snapshot");
      });
    }
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
      this.$store.commit("TOGGLE_SIDEBAR", false);
    },
    editCard(obj) {
      console.log(obj);
    },
  },
  computed: {
    getOverlayStatus() {
      return this.$store.state.overlay;
    },
    allCards() {
      return this.$store.state.cards;
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
        body.style.width = "100vw";
      } else {
        const body = document.body;
        const scrollY = body.style.top;

        body.style.position = "";
        body.style.top = "";
        body.style.width = "auto";

        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    },
    allCards() {},
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
  text-decoration: none;
  font-family: "Noto Sans TC", sans-serif;
  list-style-type: none;
  -webkit-tap-highlight-color: transparent; //手機點選時不會反白
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
    min-height: 450px;
  }
  .overlay {
    position: absolute;
    width: 100vw;
    height: 100%;
    background: rgba(114, 114, 114, 0.6);
    z-index: 1;
  }
}
</style>
