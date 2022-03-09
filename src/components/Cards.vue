<template>
  <div class="cardsContainer">
    <div class="filter">
      <i class="fas fa-search"></i>
      <i @click="list" class="fas fa-list-ul"></i>
      <i @click="block" class="fas fa-th-large"></i>
    </div>
    <ul :class="[{ list: displayBlock == false }]" class="cards">
      <li v-for="card in getCards" :key="card.id" class="card">
        <div class="operate">
          <i @click="editCard(card)" class="fas fa-edit"></i>
          <i @click="deleteCard(card.id)" class="fas fa-trash-alt"></i>
          <i
            @click="updateFav(card)"
            v-show="!card.isFav"
            class="far fa-heart"
          ></i>
          <i
            @click="updateFav(card)"
            v-show="card.isFav"
            class="fas fa-heart"
          ></i>
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
    </ul>
  </div>
</template>

<script>
import {
  db,
  colRef,
  orderBy,
  query,
  onSnapshot,
  doc,
  updateDoc,
  where,
  auth,
} from "../firebase";
export default {
  data() {
    return {
      cards: [],
      displayBlock: true,
    };
  },
  created() {
    this.cards = this.$store.state.cards;

    let favCards = this.cards.filter((card) => {
      return card.isFav == true;
    });
    if (!this.cards.length) {
      this.$emit("noCards");
    }
    if (!this.cards.length || !favCards.length) {
      this.$emit("noFav");
    }
  },
  // created() {
  //   const q = query(
  //     colRef,
  //     where("userId", "==", auth.currentUser.uid),
  //     orderBy("time", "desc")
  //   );
  //   onSnapshot(q, (snapshot) => {
  //     this.cards = [];
  //     snapshot.docs.forEach((doc) => {
  //       this.cards.push({ ...doc.data(), id: doc.id });
  //     });

  //     let favCards = this.cards.filter((card) => {
  //       return card.isFav == true;
  //     });
  //     if (!this.cards.length) {
  //       this.$emit("noCards");
  //     } else if (!this.cards.length || !favCards.length) {
  //       this.$emit("noFav");
  //     }
  //     console.log("snapshot");
  //   });
  // },
  methods: {
    editCard(card) {
      this.$store.commit("OVERLAY", true);
      this.$store.commit("CALL_POPUP", 1);
      this.$parent.$emit("edit", card);
    },
    deleteCard(id) {
      this.$store.commit("OVERLAY", true);
      this.$store.commit("CALL_POPUP", 2);
      this.$parent.$emit("delete", id);
    },
    updateFav(card) {
      const docRef = doc(db, "cards", card.id);
      updateDoc(docRef, {
        isFav: !card.isFav,
      });
    },
    list() {
      this.displayBlock = false;
    },
    block() {
      this.displayBlock = true;
    },
  },
  computed: {
    //在建立單字卡頁面紙顯示最近6個添加的單字
    getCards() {
      if (this.$route.name == "AddWords") {
        return this.cards.slice(0, 6);
      } else if (this.$route.name == "Learn") {
        return this.cards;
      } else if (this.$route.name == "Favorite") {
        return this.cards.filter((card) => {
          return card.isFav == true;
        });
      }
    },
    allCards() {
      return this.$store.state.cards;
    },
  },
  watch: {
    allCards(val) {
      console.log("val update", val);
      this.cards = val;

      let favCards = this.cards.filter((card) => {
        return card.isFav == true;
      });
      if (!this.cards.length) {
        this.$emit("noCards");
      } else {
        this.$emit("getCards");
      }

      if (!this.cards.length || !favCards.length) {
        this.$emit("noFav");
      } else {
        this.$emit("getFav");
      }
    },
  },
};
</script>

<style lang="scss">
.cardsContainer {
  width: 100%;
  .filter {
    display: flex;
    justify-content: flex-end;
    padding-right: 40px;
    i {
      cursor: pointer;
      margin: 0 8px;
      font-size: 22px;
    }
    @media (max-width: 1000px) {
      .fa-list-ul,
      .fa-th-large {
        display: none;
      }
    }
  }
  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 5px 30px;
    .card {
      position: relative;
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
          color: #ee9292;
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
.cardsContainer {
  .cards.list {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 1400px) {
  .cardsContainer {
    .cards {
      grid-template-columns: 1fr 1fr;
    }
  }
}
@media (max-width: 1000px) {
  .cardsContainer {
    .cards {
      grid-template-columns: 1fr;
      padding: 0;
    }
  }
}
</style>
