<template>
  <div class="header">
    <div class="left">
      <img src="@/assets/images/logo.png" alt="" />
      <div id="nav">
        <router-link :to="{ name: 'Home' }">首頁</router-link>
        <router-link :to="{ name: 'Learn' }">單字學習</router-link>
        <router-link :to="{ name: 'AddWords' }">建立單字卡</router-link>
        <router-link to="/">影音學習</router-link>
        <router-link to="/">閱讀學習</router-link>
      </div>
    </div>

    <div class="login-register">
      <router-link :to="{ name: 'Login' }">登入</router-link>
      <router-link :to="{ name: 'Signup' }">註冊</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  .left {
    width: 700px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 120px;
    }
    #nav {
      display: flex;
      justify-content: space-around;
      a {
        font-size: auto;
        font-weight: bold;
        color: #000;
        margin: 0 20px;
      }
      .router-link-exact-active {
        color: #ed9568;
      }
    }
  }

  .login-register {
    display: flex;
    margin-right: 50px;
    a {
      border: 2px solid black;
      width: 60px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      font-weight: bold;
      font-size: 18px;
      color: #000;
      margin: 0 20px;
    }
  }
}
</style>