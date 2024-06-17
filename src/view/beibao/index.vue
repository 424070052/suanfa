<template>
  <div class="container">
    <h4 class="background">游戏背景: 一个小偷有一个背包,背包有一定的容量,小偷有个超能力,可以看到每个物品的价值和重量,但是他只能拿走一部分物品,怎么拿才能使得背包的价值最大(请小心大香蕉)</h4>
    <div style="text-align: center">
      <el-button v-show="gameStart" type="primary" @click="restartGame">重新开始</el-button>
      <el-button v-show="gameStart" type="primary" @click="submit">提交答案</el-button>
      <el-button v-show="gameStart" type="primary" @click="checkAnswer">查看答案</el-button>
    </div>
    <div v-if="!gameStart" class="setting">

<!--      设置游戏的难度,难度(2--10)越高,物品越多-->
      <p>难度越高,物品越多</p>
      <el-select v-model="difficulty" label="难度" placeholder="请选择难度" class="input">
        <el-option label="难度2,非常简单" value="2"></el-option>
        <el-option label="难度3,简单" value="3"></el-option>
        <el-option label="难度4,一般" value="4"></el-option>
        <el-option label="难度5,困难" value="5"></el-option>
        <el-option label="难度6,非常困难" value="6"></el-option>
        <el-option label="难度7,超级困难" value="7"></el-option>
        <el-option label="难度8,变态" value="8"></el-option>
        <el-option label="难度9,超级变态" value="9"></el-option>
        <el-option label="难度10,无敌" value="10"></el-option>
      </el-select>
      <p>请输入背包容量,不输入默认为随机,100<=背包容量<=250</p>
      <el-input class="input" v-model="capacity" placeholder=""></el-input>
      <div style="margin-top: 20px">
        <el-button type="primary" @click="startGame">开始游戏</el-button>
      </div>

    </div>
    <div v-if="gameStart" style="display: flex;">
      <div class="fruits">
        <el-card v-for="(item,index) in items" :key="index" class="card">
          <div style="display: flex">
            <div>
              <img :src="`static/beibao/${item.name}.jpg`" alt="">
            </div>
            <div style="display: grid;place-items: center;">
              <p style="margin-top: 10px">名称:{{item.name}}</p>
              <p>价值:{{item.price}}</p>
              <p>体积:{{item.volume}}</p>
              <p>数量:{{item.quantity}}</p>
            </div>
          </div>
        </el-card>
      </div>
      <div class="bag">
        <p>背包容量:{{capacity}}</p>
        <p>背包剩余容量:{{bagSize}}</p>
        <p>背包价值:{{bagValue}}</p>
        <div class="select">
<!--          让玩家选择拿走哪些物品,以及拿走多少个-->
          <div v-for="(item,index) in items" :key="index" style="display: flex;">
            <div style="width: 75px;">{{item.name}}</div>
            <el-input-number v-model="item.answer" :min="0" :max="item.quantity" :step="1" @change="calculate(item)"></el-input-number>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="`答案: ${maxValue}`" :visible.sync="dialogVisible">
      <p>物品:</p>
      <ol>
        <li v-for="(item,index) in answerFruits" :key="index">{{item.name}}:{{item.quantity}}</li>
      </ol>
    </el-dialog>
<!--    //播放音乐-->
    <audio ref="audioPlayer" :loop="true">
      <source src="static/beibao/大香蕉.mp3"  type="audio/mpeg" >
    </audio>
  </div>
</template>


<script>
import { generateData } from "./generate";
import { knapsack } from "./answer.js";
export default {
  name: 'beibao',
  data(){
    return {
      items: [],
      gameStart: false,
      //难度
      difficulty: 10,
      //背包容量
      capacity: '',
      dialogVisible: false,
      answerFruits: [],
    }
  },
  computed:{
    bagValue(){
      let sum = 0;
      this.items.forEach(item => {
        sum += item.price * item.answer;
      });
      return sum;
    },
    maxValue(){
      let sum = 0;
      this.answerFruits.forEach(item => {
        sum += item.price * item.quantity;
      });
      return sum;
    },
  },
  methods:{
    startGame(){
      //开始游戏
      if(this.capacity === ''){
        this.capacity = Math.floor(Math.random()*150)+100;
      }else if(this.capacity < 100){
          this.$message.error('背包容量不能小于100');
          return;
      }else if(this.capacity > 250){
          this.$message.error('背包容量不能大于250');
          return;
      }
      this.gameStart = true;
      const result = generateData(this.difficulty,this.capacity);

      this.items = result.fruits;
      this.items.forEach(item => {
        item.class = {
          'background-image': `url(static/beibao/${item.name}.jpg)`,
          'background-size': 'cover',
        }

      });
      console.log(this.items)
      this.bagSize = result.bagSize;
    },
    restartGame() {
      //重新开始游戏,停止播放音乐(不是暂停)
      this.$refs.audioPlayer.pause();
      this.$refs.audioPlayer.currentTime = 0;
      this.gameStart = false;
      this.items = [];
    },
    submit(){
      //提交答案
      const res = knapsack({fruits: this.items,bagSize: this.capacity});
      let score = this.bagValue / res.value;
      //分数是百分比的整数
      score = Math.floor(score * 100);
      this.$message.success(`您的得分为:${score}`);

    },
    checkAnswer(){
      //查看答案
      const res = knapsack({fruits: this.items,bagSize: this.capacity});
      this.answerFruits = res.answer;
      this.dialogVisible = true;
    },
    calculate(item){
      //在大香蕉没有播放音乐的时候,如果选择了大香蕉,则播放音乐
      if(item.name === '香蕉' && item.answer > 0){
        this.$refs.audioPlayer.play();
      }else if(item.name === '香蕉' && item.answer === 0){
        this.$refs.audioPlayer.pause();
      }
      //计算背包剩余容量
      let sum = 0;
      this.items.forEach(item => {
        sum += item.volume * item.answer;
      });
      this.bagSize = this.capacity - sum;
      // 如果背包容量小于0,则提示玩家
      if(this.bagSize < 0){
        this.$message.error('背包容量不足');
        item.answer = 0;
        this.calculate(item);
      }
    }
  }
}


</script>

<style lang="scss" scoped>
.setting{
  text-align: center;
  .input{
    width: 200px;
  }
}
.background{
  background-color: #f0f0f0;
  padding: 10px;
}
.fruits{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex: 1;
  .card{
    margin: 10px;
    justify-content: center;
    align-content: center;
    width: 210px;
    img{
      width: 100px;
      height: 100px;
      margin: 10px;
    }
  }
}
.bag{
  margin-top: 10px;
  flex: 1;

}
p {
  margin: 0;
}

.el-card >>> .el-card__body{
  padding: 0px;
}
</style>
