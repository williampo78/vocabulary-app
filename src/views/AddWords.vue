<template>
  <div class="addWords">
    <h1>建立單字卡</h1>
    <FormContainer />
  </div>
</template>

<script>
import FormContainer from "../components/FormContainer.vue";
export default {
  components: {
    FormContainer,
  },
};
</script>

<style lang="scss" >
.addWords {
  width: 100%;
  h1 {
    text-align: start;
  }
}
</style>