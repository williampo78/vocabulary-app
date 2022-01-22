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
    <div class="cards">
      <!-- <div class="card">
        <div class="operate">
          <i class="fas fa-edit"></i>
          <i class="fas fa-trash-alt"></i>
          <i class="far fa-heart"></i>
          <i class="fas fa-heart"></i>
        </div>
        <div class="word">
          <p>fable (n) 預言</p>
        </div>
        <div class="line">
          <span></span>
        </div>
        <div class="example">
          <p>例句:</p>
          <p>It's a well-known fable.</p>
        </div>
      </div> -->
      <div v-for="card in cards" :key="card.id" class="card">
        <div class="operate">
          <i @click="editCard(card.id)" class="fas fa-edit"></i>
          <i class="fas fa-trash-alt"></i>
          <i class="far fa-heart"></i>
          <i class="fas fa-heart"></i>
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
      </div>
    </div>
  </div>
</template>

<script>
import { db, colRef, getDocs, onSnapshot, query, orderBy } from "../firebase";
export default {
  data() {
    return {
      cards: [],
      edit: false,
    };
  },
  created() {
    const q = query(colRef, orderBy("time", "desc"));
    onSnapshot(q, (snapshot) => {
      this.cards = [];
      snapshot.docs.forEach((doc) => {
        this.cards.push({ ...doc.data(), id: doc.id });
      });
      console.log("cards:", this.cards);
      console.log("snapshot");
    });
  },
  methods: {
    editCard(id) {
      this.$store.commit("OVERLAY", true);
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
  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 5px 30px;
    .card {
      padding: 20px;
      background: #fff;
      margin: 10px;
      min-height: 200px;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
      div {
        margin: 5px 0;
      }
      .operate {
        display: flex;
        justify-content: flex-end;
        i {
          margin: 0 5px;
          font-size: 20px;
          cursor: pointer;
        }
        .fa-edit {
          color: #4274ff;
        }
        .fa-trash-alt {
          color: #e32020;
        }
        .fas.fa-heart {
          color: #ee9292;
        }
        .far.fa-heart {
          display: none;
        }
      }
      .word {
        p {
          font-size: 25px;
          font-weight: bold;
          text-align: start;
        }
      }
      .line {
        span {
          display: block;
          width: 15px;
          height: 3px;
          background: #000;
        }
      }

      .example {
        p {
          font-size: 18px;
          font-weight: bold;
          text-align: start;
        }
      }
    }
  }
}
@media (max-width: 1200px) {
  .learn {
    .cards {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>