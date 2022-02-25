<template>
  <div class="home">
    <div class="main">
      <h1>Better late than never</h1>
      <p class="banner">現在開始還不晚! 馬上加入MAU吧</p>
      <div class="buttons">
        <button @click="$router.push({ name: 'Signup' })" class="try">
          馬上試試
        </button>
        <button @click="$router.push({ name: 'Signup' })" class="more">
          了解更多
        </button>
      </div>
      <div class="description">
        <div>
          <h3>建立屬於自己的單字本</h3>
          <p>
            背了好多單字卻沒有地方可以自己分類、蒐集嗎?
            現在就在MAU建立單字卡，開始學習吧 !
          </p>
        </div>
        <div>
          <h3>單字背不起來 做點小測驗吧</h3>
          <p>透過測驗找出還不熟悉的單字，多次練習強化記憶，增加學習效率!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.home {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 900px;
    height: 550px;
    background: url("../assets/images/main.svg") no-repeat #fff;
    background-size: 30%;
    background-position: center bottom 10%;
    h1 {
      font-size: 40px;
    }
    .banner {
      font-size: 32px;
      margin: 25px 0;
      font-weight: bold;
    }
    .buttons {
      button {
        margin: 0 1rem;
        width: 120px;
        height: 42px;
        font-size: 18px;
        font-weight: bold;
        background: none;
        border: none;
        border-radius: 3px;
        cursor: pointer;
      }
      .try {
        background: #fce895;
      }
      .more {
        border: #bce0fd 2px solid;
      }
    }
    .description {
      margin-top: 35px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      div {
        width: 40%;
        text-align: start;
        margin: 0 5vw;
        background: linear-gradient(transparent, #fff);
        h3 {
          display: inline-block;
          background: linear-gradient(transparent, #dbefe3);
        }
        p {
          margin: 10px 0;
        }
      }
    }
  }
}
@media (max-width: 900px) {
  .home {
    .main {
      width: 95%;
      height: 480px;
      background-size: 80%;
      h1 {
        font-size: 30px;
      }
      .banner {
        font-size: 24px;
      }
      .buttons {
        button {
          margin: 0 1rem;
          width: 100px;
          height: 36px;
          font-size: 16px;
        }
      }
      .description {
        margin-top: 25px;
        div {
          width: 42%;
          margin: 0 20px;
          h3 {
            display: inline-flex;
            text-align: center;
            background: linear-gradient(transparent, #dbefe3);
            font-size: 18px;
          }
          p {
            margin: 10px 0;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
