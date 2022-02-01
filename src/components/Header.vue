<template>
  <div class="header">
    <i
      v-if="
        $route.name !== 'Home' &&
        $route.name !== 'Login' &&
        $route.name !== 'Signup'
      "
      @click="openSidebar"
      class="fas fa-bars"
    ></i>
    <div class="left">
      <img
        class="logo"
        @click="$route.name == 'Home' ? null : $router.push({ name: 'Home' })"
        src="@/assets/images/logo.png"
        alt=""
      />
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
      <p>{{ userInfo.displayName }}, 歡迎</p>
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
    openSidebar() {
      let sidebar = this.$store.state.sidebar;
      let overlay = this.$store.state.overlay;
      this.$store.commit("TOGGLE_SIDEBAR", sidebar == false ? true : false);
      this.$store.commit("OVERLAY", overlay == false ? true : false);
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
  .fa-bars {
    font-size: 32px;
    z-index: 10;
  }
  @media (min-width: 900px) {
    .fa-bars {
      display: none;
    }
  }
  .left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      width: 140px;
      cursor: pointer;
    }
    #nav {
      display: flex;
      justify-content: space-around;
      a {
        font-size: 18px;
        font-weight: bold;
        color: #000;
        margin: 0 1vw;
      }
      .router-link-exact-active {
        color: #ed9568;
      }
    }
    @media (max-width: 900px) {
      #nav {
        display: none;
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
  @media (max-width: 900px) {
    .login {
      margin-right: 0;
      a {
        margin: 0 10px;
      }
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
