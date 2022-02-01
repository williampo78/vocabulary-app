<template>
  <div class="home">
    <div class="main">
      <h1>Better late than never</h1>
      <p class="banner">現在開始還不晚! 馬上加入MUA吧</p>
      <div class="buttons">
        <button @click="$router.push({ name: 'Signup' })" class="try">
          馬上試試
        </button>
        <button class="more">了解更多</button>
      </div>
      <div class="description">
        <div>
          <h3>建立屬於自己的單字本</h3>
          <p>
            背了好多單字卻沒有地方可以自己分類、蒐集嗎?
            現在就在MUA建立單字卡，滿足個人需求並高效率學習吧 !
          </p>
        </div>
        <div>
          <h3>背單字好無聊那就看點影片吧</h3>
          <p>
            影片學習效率更佳，在MUA裡我們幫你做好了影片分類，不管是從影片難度或是情境下手，都能找到你現在最想看的影片!
          </p>
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
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 95%;
      height: 480px;
      background: url("../assets/images/main.svg") no-repeat #fff;
      background-size: 80%;
      background-position: center bottom 10%;
      h1 {
        font-size: 30px;
      }
      .banner {
        font-size: 24px;
        margin: 25px 0;
        font-weight: bold;
      }
      .buttons {
        button {
          margin: 0 1rem;
          width: 100px;
          height: 36px;
          font-size: 16px;
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
        margin-top: 25px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        div {
          width: 42%;
          text-align: start;
          margin: 0 20px;
          background: linear-gradient(transparent, #fff);
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
