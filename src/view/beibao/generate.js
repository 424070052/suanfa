//生成游戏数据的小游戏
const list = ['草莓','车厘子','番石榴','橘子','荔枝','榴莲','芒果','猕猴桃','西瓜','香蕉']  //有的水果数量
const data = {
  bagSize:0,
  fruits:[]
}

export function generateData(difficulty,cb){
  data.fruits = []
  // 生成随机的背包大小(100-250)
  let bagSize = Math.floor(Math.random()*150+100)
  if(cb) bagSize = cb
  //有多少难度就有多少水果
<<<<<<< HEAD
  //给每个水果生成价格和体积,并且不能有一样的,且体积不操过背包大小的20%,也不小于5%
  for(let i=0;i<difficulty;i++){
    let price = Math.floor(Math.random()*50+1)
    let volume = Math.floor(Math.random()*(bagSize*0.2)+bagSize*0.05)
=======
  //给每个水果生成价格和体积,并且不能有一样的,且体积不操过背包大小的10%
  for(let i=0;i<difficulty;i++){
    let price = Math.floor(Math.random()*50+1)
    let volume = Math.floor(Math.random()*bagSize*0.1+1)
>>>>>>> c42c92219fc179164a83d93a1f728307be5592c6
    //水果的数量
    let quantity = Math.floor(Math.random()*(bagSize/volume)+1)
    let fruit = {
      name:list[i],
      price:price,
      volume:volume,
      quantity:quantity,
      answer:0
    }
    data.fruits.push(fruit)
<<<<<<< HEAD
    if(checkData(i)){ //如果有一样的数据,就重新生成
=======
    if(checkData(i)){
>>>>>>> c42c92219fc179164a83d93a1f728307be5592c6
      i--
      data.fruits.pop()
    }
  }
  return data
}
//测试有没有一样数据的水果
function checkData(length){
  let now = data.fruits[length]
  for(let i=0;i<length;i++){
    if (now.price === data.fruits[i].price && now.volume === data.fruits[i].volume){
      return true
    }
  }
  return false
}

