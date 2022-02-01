<template>
  <div @submit.prevent class="formContainer">
    <form>
      <div class="word">
        <label>詞語</label>
        <input v-model="input.word" type="text" />
      </div>
      <div class="translation">
        <label>定義</label>
        <input v-model="input.translation" type="text" />
      </div>
      <div class="pos">
        <label>詞性</label>
        <input v-model="input.partOfSpeech" type="text" />
      </div>
      <div class="example">
        <label>例句</label>
        <input v-model="input.example" type="text" />
      </div>
      <div v-if="!$store.state.overlay" class="buttons">
        <button ref="submitBtn" @click.prevent="addWord">加入單字</button>
      </div>
      <div v-else class="buttons">
        <button @click.prevent="submitEdit" class="save" ref="submitBtn">
          儲存
        </button>
        <button class="cancel" ref="submitBtn" @click.prevent="cancel">
          取消
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {
  colRef,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  auth,
  db,
} from "../firebase";
export default {
  data() {
    return {
      input: {
        word: "",
        translation: "",
        partOfSpeech: "",
        example: "",
      },
      isFav: false,
    };
  },
  props: ["card"],
  mounted() {
    if (this.card) {
      this.input.word = this.card.word;
      this.input.translation = this.card.translation;
      this.input.partOfSpeech = this.card.partOfSpeech;
      this.input.example = this.card.example;
    }
  },
  methods: {
    cancel() {
      this.$store.commit("OVERLAY", false);
      this.$store.commit("CALL_POPUP", null);
    },
    addWord() {
      let input = this.input;
      if (
        input.word == "" ||
        input.translation == "" ||
        input.partOfSpeech == "" ||
        input.example == ""
      ) {
        console.log("empty");
        return;
      }
      addDoc(colRef, {
        word: input.word.toLowerCase(),
        partOfSpeech: input.partOfSpeech.toLowerCase(),
        translation: input.translation,
        example: input.example.charAt(0).toUpperCase() + input.example.slice(1),
        isFav: this.isFav,
        time: serverTimestamp(),
        userId: auth.currentUser.uid,
      })
        .then((res) => {
          console.log(res);
          input.word = "";
          input.partOfSpeech = "";
          input.translation = "";
          input.example = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitEdit() {
      const vm = this;
      const docRef = doc(db, "cards", this.card.id);
      updateDoc(docRef, {
        word: vm.input.word.toLowerCase(),
        partOfSpeech: vm.input.partOfSpeech.toLowerCase(),
        translation: vm.input.translation,
        example:
          vm.input.example.charAt(0).toUpperCase() + vm.input.example.slice(1),
      })
        .then(() => {
          this.$store.commit("OVERLAY", false);
          this.$store.commit("CALL_POPUP", null);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    defaultInput() {
      return this.card ? this.card : this.input;
    },
  },
};
</script>

<style lang="scss">
.formContainer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  form {
    background: #fff;
    width: 760px;
    height: 360px;
    border-radius: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 20px 50px;
    div {
      width: 40%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 0 20px;
      input {
        width: 100%;
        height: 30px;
        border: 1px solid #8f8f8f;
        border-radius: 10px;
        background: #f1efee;
        outline: none;
        padding-left: 20px;
      }
    }
    .example {
      width: 90%;
    }
    .buttons {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      button {
        width: 110px;
        height: 50px;
        border: none;
        background: #000;
        color: #fff;
        font-size: 20px;
        border-radius: 10px;
        padding: auto;
        cursor: pointer;
        margin: 0 20px;
      }
      .cancel {
        background: #8f8f8f;
      }
    }
  }
}
@media (max-width: 900px) {
  .formContainer {
    form {
      width: 95%;
      height: 360px;
      padding: 10px;
      div {
        width: 100%;
        input {
          width: 100%;
          height: 30px;
        }
      }
      .example {
        width: 100%;
      }
      .buttons {
        justify-content: space-between;
        button {
          width: 110px;
          height: 50px;
          border: none;
          background: #000;
          color: #fff;
          font-size: 20px;
          border-radius: 10px;
          padding: auto;
          cursor: pointer;
          margin: 0 auto;
        }
        .cancel {
          background: #8f8f8f;
        }
      }
    }
  }
}
</style>
