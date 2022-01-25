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
    <!-- <ul class="cards">
      <li v-for="card in cards" :key="card.id" class="card">
        <div class="operate">
          <i @click="editCard(card)" class="fas fa-edit"></i>
          <i @click="deleteCard(card.id)" class="fas fa-trash-alt"></i>
          <i v-show="card.isFav == false" class="far fa-heart"></i>
          <i v-show="card.isFav == true" class="fas fa-heart"></i>
        </div>

        <div class="word">
          <p>
            {{ card.word }} ({{ card.partOfSpeech }}) {{ card.translation }}
          </p>
        </div>
        <div class="line">
          <span></span>
        </div>
        <div class="example">
          <p>例句:</p>
          <p>{{ card.example }}</p>
        </div>
      </li>
    </ul> -->
    <Cards />
  </div>
</template>

<script>
import { db, colRef, getDocs, onSnapshot, query, orderBy } from "../firebase";
import Cards from "../components/Cards.vue";

export default {
  data() {
    return {
      cards: [],
      edit: false,
    };
  },
  components: { Cards },
  // created() {
  //   const q = query(colRef, orderBy("time", "desc"));
  //   onSnapshot(q, (snapshot) => {
  //     this.cards = [];
  //     snapshot.docs.forEach((doc) => {
  //       this.cards.push({ ...doc.data(), id: doc.id });
  //     });
  //     console.log("cards:", this.cards);
  //     console.log("snapshot");
  //   });
  // },
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