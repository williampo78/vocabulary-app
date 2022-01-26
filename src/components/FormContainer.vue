<template>
  <div class="formContainer">
    <form>
      <div class="word">
        <label>詞語</label>
        <input v-model="defaultInput.word" type="text" />
      </div>
      <div class="translation">
        <label>定義</label>
        <input v-model="defaultInput.translation" type="text" />
      </div>
      <div class="pos">
        <label>詞性</label>
        <input v-model="defaultInput.partOfSpeech" type="text" />
      </div>
      <div class="example">
        <label>例句</label>
        <input v-model="defaultInput.example" type="text" />
      </div>
      <div v-if="!$store.state.overlay" class="buttons">
        <button ref="submitBtn" @click.prevent="addWord">加入單字</button>
      </div>
      <div v-else class="buttons">
        <button class="cancel" ref="submitBtn" @click.prevent="cancel">
          取消
        </button>
        <button class="save" ref="submitBtn" @click.prevent="addWord">
          儲存
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { colRef, addDoc, serverTimestamp } from "../firebase";
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
  methods: {
    cancel() {
      this.$store.commit("OVERLAY", false);
      this.$store.commit("POPUP", null);
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
      align-items: center;
      justify-content: center;
      flex-direction: row;
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
</style>