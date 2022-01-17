<template>
  <div class="header">
    <div class="left">
      <img src="@/assets/images/logo.png" alt="" />
      <div id="nav">
        <router-link to="/">首頁</router-link>
        <router-link to="/learn">單字學習</router-link>
        <router-link to="/addWords">建立單字卡</router-link>
        <router-link to="/about">影音學習</router-link>
        <router-link to="/about">閱讀學習</router-link>
      </div>
    </div>

    <div class="login-register">
      <router-link to="/about">登入</router-link>
      <router-link to="/about">註冊</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.header {
  display: grid;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  .left {
    display: flex;
    align-items: center;
    img {
      width: 140px;
      margin: 0 150px auto 0;
    }
    #nav {
      display: flex;
      justify-content: space-around;
      a {
        font-size: 20px;
        font-weight: bold;
        color: #000;
        margin: 0 20px;
      }
    }
  }

  .login-register {
    display: flex;
    margin-right: 50px;
    a {
      border: 2px solid black;
      width: 100px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      font-weight: bold;
      font-size: 20px;
      color: #000;
      margin: 0 20px;
    }
  }
}
</style>