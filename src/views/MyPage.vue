<template>
  <div class="myPage">
    <h1>我的主頁</h1>
    <div class="myInfo">
      <div>
        <p>我已建立的單字卡數量</p>
        <p class="amount">{{ $store.state.cards.length }}</p>
      </div>
      <div>
        <p>我已收藏的單字卡數量</p>
        <p class="amount">{{ numberOfFavs.length }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    numberOfFavs() {
      return this.$store.state.cards.filter((card) => {
        return card.isFav == true;
      });
    },
  },
};
</script>

<style lang="scss">
.myPage {
  width: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    text-align: left;
  }
  .myInfo {
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 400px;
      height: 320px;
      background: #fff;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
      margin: 0 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      p {
        font-size: 25px;
        font-weight: bold;
      }
      .amount {
        font-size: 36px;
        color: #4274ff;
      }
    }
  }
}
@media (max-width: 900px) {
  .myPage {
    width: 100vw;
    margin: 0 20px;
    h1 {
      text-align: left;
    }
    .myInfo {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      div {
        width: 95%;
        height: 200px;
        margin: 15px 0;
        p {
          font-size: 25px;
          font-weight: bold;
        }
        .amount {
          font-size: 36px;
          color: #4274ff;
        }
      }
    }
  }
}
</style>
