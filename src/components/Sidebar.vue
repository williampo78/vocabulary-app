<template>
  <div :class="{ openSidebar: $store.state.sidebar }" class="sidebar">
    <div>
      <p v-if="userInfo">{{ userInfo.displayName }}</p>
      <p></p>
    </div>
    <ul>
      <li v-for="link in links" :key="link.routerName">
        <router-link :to="{ name: link.routerName }">
          <img :src="link.iconSrc" alt="" /> {{ link.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase";
export default {
  data() {
    return {
      links: [
        {
          routerName: "MyPage",
          iconSrc: require("@/assets/images/puzzle_icon.svg"),
          title: "我的主頁",
        },
        {
          routerName: "Learn",
          iconSrc: require("@/assets/images/book_icon.svg"),

          title: "單字學習",
        },
        {
          routerName: "AddWords",
          iconSrc: require("@/assets/images/add_icon.svg"),

          title: "建立單字卡",
        },
        {
          routerName: "Favorite",
          iconSrc: require("@/assets/images/like_icon.svg"),

          title: "我的收藏",
        },
        {
          routerName: "Quiz",
          iconSrc: require("@/assets/images/quiz.svg"),

          title: "單字測驗",
        },
      ],

      userInfo: null,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.userInfo = user;
    });
  },
  watch: {
    $route(to, from) {
      this.$store.commit("TOGGLE_SIDEBAR", false);
      this.$store.commit("OVERLAY", false);
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  // width: 26vw;
  min-width: 220px;
  // width:220px;
  height: 700px;
  background: #ed9568;
  display: flex;
  flex-direction: column;
  border-radius: 0px 35px 35px 0px;
  margin-right: 60px;
  transition: all ease 1s;
  div {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      font-size: 22px;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    list-style-type: none;
    li {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: flex-end;
      a {
        padding-left: 20px;
        display: inline-flex;
        width: 80%;
        height: 100%;
        align-items: center;
        font-size: 22px;
        font-weight: bold;
        color: #000;
        border-radius: 45px 0px 0 45px;
        img {
          width: 25px;
          height:25px;
          margin: 0 10px;
        }
      }
      .router-link-exact-active {
        position: relative;
        background: #f1efee;
        &:after {
          content: "";
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 0 20px 20px;
          border-color: transparent transparent #f1efee transparent;
          position: absolute;
          right: 0;
          top: -20px;
        }
      }
    }
  }
}
@media (max-width: 1400px) {
  .sidebar {
    margin-right: 30px;
    ul {
      li {
        a {
          width: 100%;
        }
      }
    }
  }
}
@media (max-width: 900px) {
  .sidebar {
    transform: translateX(-250px);
    position: absolute;
    z-index: 5;
    top: -103px;
    height: 100vh;
    ul {
      li {
        a {
          width: 100%;
        }
      }
    }
  }
  .openSidebar {
    transform: translateX(0px);
  }
}
</style>
