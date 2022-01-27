<template>
  <div class="learn">
    <h1>單字學習</h1>
    <div class="top">
      <div class="switching">
        <span>所有單字</span>
        <button>開始學習</button>
      </div>
      <div class="filter">
        <i class="fas fa-search"></i>
        <i class="fas fa-list-ul"></i>
        <i class="fas fa-th-large"></i>
      </div>
    </div>
    <Cards />
  </div>
</template>

<script>
import getUser from "../composables/getUser";
import Cards from "../components/Cards.vue";

export default {
  data() {
    return {
      cards: [],
      edit: false,
      userInfo: null,
    };
  },

  created() {
    const { userInfo } = getUser();
    this.userInfo = userInfo;
  },
  components: { Cards },
  methods: {
    editCard(card) {
      this.$store.commit("OVERLAY", true);
      this.$store.commit("CALL_POPUP", 1);
      this.$emit("edit", card);
    },
    deleteCard(id) {
      this.$store.commit("OVERLAY", true);
      this.$store.commit("CALL_POPUP", 2);
      this.$emit("delete", id);
    },
  },
};
</script>

<style lang="scss">
.learn {
  width: 100%;
  h1 {
    text-align: start;
  }
  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .switching {
      display: flex;
      align-items: center;
      span {
        font-size: 22px;
        color: #495dc5;
        font-weight: bold;
        cursor: default;
      }
      button {
        width: 85px;
        height: 35px;
        border-radius: 5px;
        outline: none;
        background: #fff4e7;
        border: 2px solid #8f8f8f;
        margin: 0 20px;
        cursor: pointer;
      }
    }
    .filter {
      display: flex;
      padding-right: 40px;
      i {
        cursor: pointer;
        margin: 0 5px;
      }
    }
  }
}
</style>