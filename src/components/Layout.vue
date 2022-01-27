<template>
  <div class="layout">
    <div class="sidebar">
      <div>
        <!-- <p>William Chou</p> -->
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
    <router-view @delete="deleteCard($event)" @edit="editCard($event)" />
    <FormContainer
      :card="card"
      v-if="$store.state.overlay == true && $store.state.popUp == 1"
      class="modify"
    />
    <DeleteCheck
      :deleteId="deleteId"
      v-if="$store.state.overlay == true && $store.state.popUp == 2"
    />
  </div>
</template>

<script>
import FormContainer from "./FormContainer.vue";
import DeleteCheck from "./DeleteCheck.vue";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase";

export default {
  components: { FormContainer, DeleteCheck },
  data() {
    return {
      links: [
        {
          routerName: "Home",
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
      ],
      deleteId: "",
      card: {},
      userInfo: null,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.userInfo = user;
    });
  },
  methods: {
    deleteCard(id) {
      this.deleteId = id;
    },
    editCard(card) {
      this.card = card;
    },
  },
};
</script>

<style lang="scss">
.layout {
  position: relative;
  margin-top: 60px;
  width: 100%;
  display: flex;
  padding-right: 60px;
  .sidebar {
    width: 26vw;
    min-width: 220px;
    height: 700px;
    background: #ed9568;
    display: flex;
    flex-direction: column;
    border-radius: 0px 35px 35px 0px;
    margin-right: 60px;
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
  .modify {
    width: 50%;
    position: fixed;
    top: 60vh;
    left: 50%;
    transform: translate(-50%, -100%);
    z-index: 5;
  }
}

@media (max-width: 1400px) {
  .layout {
    padding: 0;
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
}
</style>