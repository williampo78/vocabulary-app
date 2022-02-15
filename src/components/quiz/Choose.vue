<template>
  <div v-if="connectedToDB" class="quizChoose">
    <div class="quizContainer">
      <div class="question">
        <p>
          {{ questions[questionIndex].word }} ({{
            questions[questionIndex].partOfSpeech
          }})
        </p>
      </div>
      <!-- <div
        v-for="(option, index) in createOptions[questionIndex]"
        :key="index"
        class="options"
      >
        <button @click="answer(index)">
          {{ option[0].translation }}
        </button>
        <button>{{ option[1].translation }}</button>
        <button>{{ option[2].translation }}</button>
        <button>{{ option[3].translation }}</button>
      </div> -->
      <div class="options">
        <button @click="answer(questionIndex)">
          {{ createOptions[questionIndex][0].translation }}
        </button>
        <button>{{ createOptions[questionIndex][1].translation }}</button>
        <button>{{ createOptions[questionIndex][2].translation }}</button>
        <button>{{ createOptions[questionIndex][3].translation }}</button>
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
      questionIndex: 0,
      questions: [],
      options: [],
      numberOfQuestions: 10,
    };
  },
  created() {
    let n = this.numberOfQuestions;
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

      //隨機選出n個單字作為題目
      let arr = this.cards,
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

  methods: {
    changeIndex(change) {
      let length = this.numberOfQuestions;
      //總共幾題
      this.questionIndex = (this.questionIndex + change + length) % length;
    },
    answer(index) {
      console.log(index);
    },
  },
  computed: {
    createOptions() {
      const options = [];
      this.questions.forEach((q) => {
        // 把該題目的單字排除
        const filtered = this.cards.filter((card) => {
          return card !== q;
        });

        // 剩下的全部打亂選出三個當選項
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 3);
        // 把題目的單字push進去
        selected.push(q);
        // 再重新打亂
        selected.sort(() => 0.5 - Math.random());
        options.push(selected);
      });
      console.log(options);
      return options;
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
