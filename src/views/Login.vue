<template>
  <div class="loginPage">
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
.loginPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>