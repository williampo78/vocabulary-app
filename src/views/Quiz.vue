<template>
  <div class="quiz">
      <h1>單字測驗</h1>
      <button>開始測驗</button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.quiz{
    width: 100%;
    h1{
        text-align: start;
    }
}

@media (max-width: 900px) {
  .quiz {
    width: 100vw;
    margin: 0 20px;
  }
}
</style>