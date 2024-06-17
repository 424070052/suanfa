<template>
  <div class="outContainer">
    <div id="nav">
      <div style="text-align: center;">
        <router-link to="/beibao" >
          <img src="static/beibao/index.jpg" alt="" class="navImg">
          <div>背包问题</div>
        </router-link>
      </div>
      <div style="text-align: center;">
        <router-link to="/short" >
          <img src="static/beibao/index.jpg" alt="" class="navImg">
          <div>最短问题</div>
        </router-link>
      </div>
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import router from "../router";
export default {
  name: 'layout',
  created() {
    console.log(router)

  }
}
</script>

<style>
.navImg{
  width: 50px;
  height: 50px;
}
.outContainer{
  width: 100%;
  height:100vh;
  /* //下面的div居中对其 */
  /* display: flex; */
}
.container{
  background-color: #f0f0f0;
  width: 90%;
  height: calc(100vh - 84px);
  margin: 0 auto;
  overflow-y: scroll;
}
#nav{
  background-color: #aaaaaa;
  width: 100%;
  height: 84px;
  /* //position: fixed;
  //top: 0;
  //left: 0; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
