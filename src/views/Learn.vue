<template>
  <div class="learn">
    <h1>單字學習</h1>
    <FlipCard v-if="flipCard" />
    <button class="finish" @click="flipCard = false" v-if="flipCard">
      結束學習
    </button>
    <div v-if="!flipCard" class="top">
      <div class="switching">
        <span>所有單字</span>
        <button v-if="hasCards" @click="flipCard = true">開始學習</button>
      </div>
    </div>
    <Cards v-if="!flipCard" @noCards="noCards" @getCards="getCards" />
    <div v-if="!hasCards" class="noCards">
      <p>還沒有單字, 現在開始建立單字庫吧</p>
      <button v-if="!hasCards" @click="$router.push({ name: 'AddWords' })">
        去建立
      </button>
    </div>
  </div>
</template>

<script>
import getUser from "../composables/getUser";
import Cards from "../components/Cards.vue";
import FlipCard from "../components/FlipCard.vue";

export default {
  data() {
    return {
      edit: false,
      userInfo: null,
      hasCards: true,
      flipCard: false,
    };
  },

  created() {
    const { userInfo } = getUser();
    this.userInfo = userInfo;
  },
  components: { Cards, FlipCard },
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
    noCards() {
      this.hasCards = false;
    },
    getCards() {
      this.hasCards = true;
    },
  },
};
</script>

<style lang="scss">
.learn {
  width: 100%;
  .finish {
    width: 85px;
    height: 35px;
    border-radius: 5px;
    outline: none;
    background: #fff4e7;
    border: 2px solid #8f8f8f;
    margin: 0 20px;
    cursor: pointer;
    margin-top: 30px;
  }
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
  }
}
@media (max-width: 900px) {
  .learn {
    width: 100vw;
    margin: 0 20px;
  }
}
</style>
