<template>
  <div v-if="connectedToDB" class="quizChoose">
    <!-- <p>{{ currentCard.word }} ({{ currentCard.partOfSpeech }})</p> -->
    <div class="quizContainer">
      <div class="question">
        <p>{{ questions[index].word }} ({{ questions[index].partOfSpeech }})</p>
      </div>
      <div class="options">
        <button>狗</button>
        <button>貓</button>
        <button>老鼠</button>
        <button>豬</button>
      </div>
    </div>

    <i @click="changeIndex(1)" class="fas fa-chevron-right"></i>
  </div>
</template>

<script>
import { colRef, orderBy, query, where, auth, onSnapshot } from "@/firebase";

export default {
  data() {
    return {
      cards: [],
      connectedToDB: false,
      index: 0,
      questions: [],
    };
  },
  created() {
    const q = query(
      colRef,
      where("userId", "==", auth.currentUser.uid),
      orderBy("time", "desc")
    );
    onSnapshot(q, (snapshot) => {
      this.connectedToDB = true;
      this.cards = [];
      snapshot.docs.forEach((doc) => {
        this.cards.push({ ...doc.data(), id: doc.id });
      });
      let arr = this.cards,
        n = 5,
        result = new Array(n),
        len = arr.length,
        taken = new Array(len);
      if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
      }
      this.questions = result;
    });
  },
  computed: {
    currentCard() {
      return this.getRandom[this.index];
    },
  },
  methods: {
    changeIndex(change) {
      let length = 5;
      this.index = (this.index + change + length) % length;
    },
  },
};
</script>

<style lang="scss">
.quizChoose {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .quizContainer {
    width: 70%;
    height: 350px;
    background: #fff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .question {
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-size: 28px;
      }
    }
    .options {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      button {
        width: 45%;
        margin: 10px 0;
        height: 55px;
        font-size: 18px;
        cursor: pointer;
        border: 1px solid #b7b7b7;
        background: none;
        border-radius: 5px;
      }
    }
  }
}
</style>
