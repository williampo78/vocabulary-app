<template>
  <div class="addWords">
    <h1>建立單字卡</h1>
    <FormContainer />
    <h2 class="recent">最近添加的單字</h2>
    <Cards />
  </div>
</template>

<script>
import Cards from "../components/Cards.vue";
import FormContainer from "../components/FormContainer.vue";
export default {
  components: {
    FormContainer,
    Cards,
  },
};
</script>

<style lang="scss">
.addWords {
  width: 100%;

  h1 {
    text-align: start;
  }
  .recent {
    font-size: 27px;
    text-align: start;
    margin-top: 50px;
    color: #495dc5;
  }
}
@media (max-width: 900px) {
  .addWords {
    width: 100vw;
    margin: 0 20px;
  }
}
</style>
