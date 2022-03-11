<template>
  <form @submit.prevent class="loginForm">
    <h1 v-if="$route.name == 'Signup'">註冊</h1>
    <h1 v-else>登入</h1>
    <div v-if="$route.name == 'Signup'">
      <label for=""><i class="fas fa-user"></i></label>
      <input v-model="account" placeholder="名稱" type="text" />
    </div>
    <div>
      <label for=""><i class="fas fa-envelope"></i></label>
      <input v-model="email" placeholder="信箱" type="email" />
    </div>

    <div>
      <label for=""><i class="fas fa-lock"></i></label>
      <input v-model="password" placeholder="密碼" type="password" />
    </div>
    <p class="errorMsg" v-if="loginError">帳號或密碼錯誤</p>
    <button @click="signUp()" v-if="$route.name == 'Signup'">註冊</button>
    <button @click="logIn()" v-else>登入</button>
    <p v-if="$route.name == 'Signup'">
      已經有帳號了?
      <router-link :to="{ name: 'Login' }">立即登入</router-link>
    </p>
    <p v-else>
      還沒有帳號嗎?
      <router-link :to="{ name: 'Signup' }">點此註冊</router-link>
      <br />
      <span style="color: #555; font-size: 13px"
        >測試帳號: test@gmail.com
      </span>
      <br />
      <span style="color: #555; font-size: 13px">密碼: 123456</span>
    </p>
  </form>
</template>

<script>
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  colRef,
  orderBy,
  query,
  onSnapshot,
  where,
} from "../firebase";

export default {
  data() {
    return {
      account: "",
      email: "",
      password: "",
      loginError: false,
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
          console.log("註冊錯誤");
        });
    },
    logIn() {
      this.loginError = false;
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);

          const q = query(
            colRef,
            where("userId", "==", auth.currentUser.uid),
            orderBy("time", "desc")
          );
          onSnapshot(q, (snapshot) => {
            let cards = [];
            snapshot.docs.forEach((doc) => {
              cards.push({ ...doc.data(), id: doc.id });
            });
            this.$store.commit("GET_WORDS", cards);
            this.$router.push({ name: "Learn" });

            console.log("On snapshot");
          });
        })
        .catch((err) => {
          console.log(err);
          this.loginError = true;
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
  .errorMsg {
    color: rgb(218, 23, 23);
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
