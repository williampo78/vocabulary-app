<template>
  <form @submit.prevent class="loginForm">
    <h1 v-if="$route.name == 'Signup'">註冊</h1>
    <h1 v-else>登入</h1>
    <div v-if="$route.name == 'Signup'">
      <label for=""><i class="fas fa-user"></i></label>
      <input v-model="account" placeholder="姓名" type="text" />
    </div>
    <div>
      <label for=""><i class="fas fa-envelope"></i></label>
      <input v-model="email" placeholder="信箱" type="email" />
    </div>

    <div>
      <label for=""><i class="fas fa-lock"></i></label>
      <input v-model="password" placeholder="密碼" type="password" />
    </div>

    <button @click="signUp()" v-if="$route.name == 'Signup'">註冊</button>
    <button @click="logIn()" v-else>登入</button>
    <p v-if="$route.name == 'Signup'">
      已經有帳號了?
      <router-link :to="{ name: 'Login' }">立即登入</router-link>
    </p>
    <p v-else>
      還沒有帳號嗎?
      <router-link :to="{ name: 'Signup' }">點此註冊</router-link>
    </p>
  </form>
</template>

<script>
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "../firebase";

export default {
  data() {
    return {
      account: "",
      email: "",
      password: "",
    };
  },
  methods: {
    signUp() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          this.$router.push({ name: "Learn" });
          this.email = "";
          this.password = "";
          updateProfile(user, { displayName: this.account })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logIn() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          this.$router.push({ name: "Learn" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.loginForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  //   border: 1px solid rgb(153, 153, 153);
  padding: 30px;
  //   background: rgb(255, 255, 255);
  div {
    margin: 10px 0;
    display: flex;
    width: 80%;
    border: 1px solid #000;
    label {
      margin: 0 10px;
      display: flex;
      align-items: center;
      i {
        color: #6a6f73;
      }
    }
    input {
      outline: none;
      border: none;
      background: none;
      height: 40px;
      width: 80%;
    }
  }
  button {
    margin: 20px 0 10px 0;
    width: 80%;
    height: 38px;
    background: #495dc5;
    border: none;
    outline: none;
    border-radius: 5px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }
  p {
    a {
      text-decoration: underline;
      color: #495dc5;
    }
  }
}
@media (max-width: 900px) {
  .loginForm {
    width: 100%;
    padding: 10px;
    div {
      margin: 10px 0;
      display: flex;
      width: 80%;
      label {
        i {
        }
      }
      input {
        background: none;
        height: 40px;
        width: 90%;
      }
    }
    button {
      margin: 20px 0 10px 0;
      width: 80%;
      height: 38px;
      background: #495dc5;
      border: none;
      outline: none;
      border-radius: 5px;
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }
    p {
      a {
        text-decoration: underline;
        color: #495dc5;
      }
    }
  }
}
</style>
