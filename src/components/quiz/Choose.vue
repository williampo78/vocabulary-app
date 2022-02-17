<template>
  <div v-if="connectedToDB" class="quizChoose">
    <div v-if="!showResult" class="quizContainer">
      <div class="question">
        <p>
          {{ questions[questionIndex].word }} ({{
            questions[questionIndex].partOfSpeech
          }})
        </p>
      </div>
      <div class="options">
        <button
          @click="submitAnswer(option, index)"
          v-for="(option, index) in createOptions[questionIndex]"
          :key="index"
          :class="[
            { correct: option == questions[questionIndex] && answered },
            {
              incorrect:
                optionIndex == index &&
                option !== questions[questionIndex] &&
                answered,
            },
          ]"
        >
          {{ option.translation }}
        </button>
      </div>
    </div>
    <div class="result" v-if="showResult">
      <h1>你的分數:</h1>
      <h2>{{ numberOfCorrects }}/{{ numberOfQuestions }}</h2>
      <button @click="testAgain">再測驗一次</button>
    </div>

    <!-- <i @click="changeIndex(1)" class="fas fa-chevron-right"></i> -->
  </div>
</template>

<script>
import { colRef, orderBy, query, where, auth, onSnapshot } from "@/firebase";

export default {
  data() {
    return {
      cards: [],
      connectedToDB: false,
      questionIndex: 0, //第幾題
      questions: [], //全部問題
      options: [], //全部選項
      numberOfQuestions: 10, //設定總共幾題
      answered: false, //選取答案
      optionIndex: null, //該題選的選項
      showResult: false,
      numberOfCorrects: 0,
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
    testAgain() {
      this.showResult = false;
      this.questionIndex = 0;
    },
    submitAnswer(option, index) {
      this.answered = true; //提交答案
      this.optionIndex = index; //得到選取選項的Index
      let correctAnswer = this.questions[this.questionIndex];

      if (option === correctAnswer) {
        this.numberOfCorrects++;
      }

      //切換到下一題
      setTimeout(() => {
        let length = this.numberOfQuestions;
        if (this.questionIndex == length - 1) {
          this.answered = false;
          this.showResult = true;
          return;
        } else {
          this.answered = false;
          this.questionIndex = (this.questionIndex + 1 + length) % length;
        }
      }, 500);
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
      // console.log(options);
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
        border: 2px solid #b3afaf;
        background: none;
        border-radius: 5px;
      }
      .correct {
        background: rgb(40, 184, 40);
        border-color: rgb(40, 184, 40);
      }
      .incorrect {
        background: rgb(240, 54, 54);
        border-color: rgb(240, 54, 54);
      }
    }
  }
  .result {
    width: 450px;
    height: 350px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      text-align: center;
      color: #4274ff;
      font-size: 36px;
    }
    h2 {
      font-size: 30px;
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
}
@media (max-width: 900px) {
  .quizChoose {
    width: 100%;
    margin-top: 50px;
    .quizContainer {
      width: 100%;
      height: auto;
      background: #fff;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .question {
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          font-size: 35px;
        }
      }
      .options {
        margin: 10px 0;

        justify-content: space-around;
        button {
          width: 95%;
          margin: 5px 0;
          height: 60px;
        }
        .correct {
          background: rgb(40, 184, 40);
        }
        .incorrect {
          background: rgb(240, 54, 54);
        }
      }
    }
    .result {
      width: 100%;
      height: 280px;
      h1 {
        text-align: center;
        color: #4274ff;
        font-size: 36px;
        margin: 10px 0;
      }
      h2 {
        font-size: 30px;
      }
      button {
        margin: 20px 0;
        width: auto;
        height: auto;
        padding: 6px 8px;
        font-size: 20px;
      }
    }
  }
}
</style>
