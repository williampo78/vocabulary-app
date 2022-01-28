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
        <i @click="list" class="fas fa-list-ul"></i>
        <i @click="block" class="fas fa-th-large"></i>
      </div>
    </div>
    <Cards @noCards="noCards" />
    <div class="noCards">
      <p v-if="!hasCards">還沒有單字, 現在開始建立單字庫吧</p>
      <button v-if="!hasCards" @click="$router.push({ name: 'AddWords' })">
        去建立
      </button>
    </div>
  </div>
</template>

<script>
import getUser from "../composables/getUser";
import Cards from "../components/Cards.vue";

export default {
  data() {
    return {
      edit: false,
      userInfo: null,
      hasCards: true,
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
    list() {
      this.$store.commit("CHANGE_DISPLAY", 1);
    },
    block() {
      this.$store.commit("CHANGE_DISPLAY", 0);
    },
    noCards() {
      this.hasCards = false;
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
  .noCards {
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      font-size: 25px;
      color: #4274ff;
      font-weight: bold;
    }
    button {
      margin: 20px 0;
      width: 120px;
      height: 45px;
      font-size: 20px;
      border-radius: 5px;
      border: none;
      border: 1px solid #000;
      background: #fff4e7;
      cursor: pointer;
    }
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
        margin: 0 8px;
        font-size: 22px;
      }
      .fa-th-large {
      }
    }
  }
}
</style>