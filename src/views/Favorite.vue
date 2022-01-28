<template>
  <div class="favorite">
    <h1>我的收藏</h1>

    <p class="noCards" v-if="!hasFavCards">
      還沒有收藏的單字, 快來收集喜歡或不熟悉的單字吧
    </p>
    <Cards @noFav="noFav" />
  </div>
</template>

<script>
import Cards from "../components/Cards.vue";
export default {
  data() {
    return {
      hasFavCards: true,
    };
  },
  components: { Cards },
  methods: {
    noFav() {
      this.hasFavCards = false;
    },
  },
};
</script>

<style lang="scss">
.favorite {
  width: 100%;
  h1 {
    text-align: start;
  }
  .noCards {
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    color: #4274ff;
    font-weight: bold;
  }
}
</style>