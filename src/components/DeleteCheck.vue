<template>
  <div class="dlt-check">
    <i @click="cancelDelete" class="fas fa-times-circle"></i>
    <p>確定要刪除嗎</p>
    <div class="buttons">
      <button @click="cancelDelete" class="dlt dlt-cancel">否</button>
      <button @click="deleteHandler" class="dlt dlt-confirm">是</button>
    </div>
  </div>
</template>

<script>
import { db, doc, deleteDoc } from "../firebase";

export default {
  props: ["deleteId"],
  methods: {
    cancelDelete() {
      this.$store.commit("OVERLAY", false);
      this.$store.commit("CALL_POPUP", null);
    },
    deleteHandler() {
      const docRef = doc(db, "cards", this.deleteId);
      deleteDoc(docRef).then(() => {
        this.$store.commit("OVERLAY", false);
        this.$store.commit("CALL_POPUP", null);
      });
      console.log(deleteDoc(doc(db, "cards", this.deleteId)));
    },
  },
};
</script>

<style lang="scss" >
.dlt-check {
  width: 30vw;
  height: 18vw;
  background: #fff;
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .fa-times-circle {
    top: 0;
    position: absolute;
    right: 20px;
    top: 20px;
    color: #8f8f8f;
    font-size: 25px;
    cursor: pointer;
  }
  p {
    font-size: 30px;
    margin: 10px 0 35px 0;
  }
  .buttons {
    display: flex;
    justify-content: center;
    button {
      width: 106px;
      height: 48px;
      margin: 0 20px;
      border-radius: 10px;
      border: none;
      outline: none;
      cursor: pointer;
      color: #fff;
      font-size: 20px;
      padding: 0 auto;
    }
    .dlt-confirm {
      background: #ef6464;
    }
    .dlt-cancel {
      background: #5b58a5;
    }
  }
}
</style>