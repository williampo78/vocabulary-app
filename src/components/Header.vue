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

    <div v-if="!userInfo" class="login">
      <router-link :to="{ name: 'Login' }">登入</router-link>
      <router-link :to="{ name: 'Signup' }">註冊</router-link>
    </div>

    <div v-if="userInfo" class="loggedIn">
      <p>{{ userInfo.displayName }} 歡迎繼續您的學習</p>
      <button @click="logOut">登出</button>
    </div>
  </div>
</template>

<script>
import { onAuthStateChanged } from "@firebase/auth";
import { signOut } from "../firebase";
import { auth } from "../firebase";
export default {
  data() {
    return {
      userInfo: null,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.userInfo = user;
    });
  },
  methods: {
    logOut() {
      signOut(auth)
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
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

  .login {
    display: flex;
    margin-right: 50px;
    a {
      border: 2px solid black;
      width: 50px;
      height: 32px;
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
  .loggedIn {
    display: flex;
    align-items: center;
    p {
      font-size: 18px;
    }
    button {
      border: 2px solid black;
      width: 50px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      font-weight: bold;
      font-size: 18px;
      color: #000;
      margin: 0 20px;
      cursor: pointer;
    }
  }
}
</style>