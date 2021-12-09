<template>
  <div class="mainbox">
    <div class="err">4</div>
    <i class="far fa-question-circle fa-spin"></i>
    <div class="err2">4</div>
    <div class="msg">
      這是個不存在的頁面唷
      <p>回<router-link to="/home">首頁</router-link>吧</p>
    </div>
  </div>
</template>

<style lang="scss">
.mainbox {
  margin: auto;
  height: 600px;
  width: 600px;
  position: relative;
}

.err {
  color: var(--main-color);
  font-size: 11rem;
  position: absolute;
  left: 20%;
  top: 8%;
}

.far {
  position: absolute;
  font-size: 8.5rem;
  left: 42%;
  top: 15%;
  color: var(--main-color);
}

.err2 {
  color: var(--main-color);
  font-family: "Nunito Sans", sans-serif;
  font-size: 11rem;
  position: absolute;
  left: 68%;
  top: 8%;
}

.msg {
  text-align: center;
  font-size: 1.6rem;
  position: absolute;
  left: 16%;
  top: 45%;
  width: 75%;
}

a {
  text-decoration: none;
  color: var(--main-color);
}

a:hover {
  text-decoration: underline;
}
</style>
