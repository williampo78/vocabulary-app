<template>
  <div class="flipCard">
    <div v-if="connectedToDB">
      <i @click="changeIndex(-1)" class="fas fa-chevron-left"></i>
      <ul @click="showAns">
        <li>
          <span v-if="!answer"
            >{{ currentCard.word }} ({{ currentCard.partOfSpeech }})</span
          >
          <span v-if="answer">{{ currentCard.translation }}</span>
        </li>
      </ul>
      <i @click="changeIndex(1)" class="fas fa-chevron-right"></i>
    </div>
  </div>
</template>

<script>
import { colRef, orderBy, query, where, auth, onSnapshot } from "../firebase";
export default {
  data() {
    return {
      cards: [],
      connectedToDB: false,
      answer: false,
      index: 0,
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
    });
  },
  methods: {
    showAns() {
      this.answer = !this.answer;
    },
    changeIndex(change) {
      let length = this.cards.length;
      this.index = (this.index + change + length) % length;
      this.answer = false;
    },
  },
  computed: {
    currentCard() {
      return this.cards[this.index];
    },
  },
};
</script>

<style lang="scss">
.flipCard {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  div {
    width: 530px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;

    ul {
      width: 90%;
      height: 270px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: #fff;
      box-shadow: 0 2px 10px 0 rgb(0, 0, 0 / 32%);
      border-radius: 20px;
      margin: 0 20px;
      li {
        margin: 20px 0;
        font-size: 40px;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        outline: none;
      }
    }
    .fas {
      font-size: 50px;
    }
  }
}
@media (max-width: 900px) {
  .flipCard {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    div {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 5px;

      ul {
        width: 100%;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: #fff;
        box-shadow: 0 2px 10px 0 rgb(0, 0, 0 / 32%);
        border-radius: 20px;
        margin: 0 10px;
        li {
          margin: 20px 0;
          font-size: 35px;
          user-select: none;
          display: flex;
          justify-content: center;
          align-items: center;
          outline: none;
        }
      }
      .fas {
        font-size: 35px;
      }
    }
  }
}
</style>