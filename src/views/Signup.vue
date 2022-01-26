<template>
  <div class="signupPage">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
export default {
  components: { LoginForm },
};
</script>

<style lang="scss">
.signupPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>