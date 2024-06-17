<<<<<<< HEAD
// import {log} from "shelljs/src/common";
=======
>>>>>>> c42c92219fc179164a83d93a1f728307be5592c6

export function knapsack(list) {  //获取最大价值,并返回每种水果的数量,参数是水果的数组
  // const n = list.fruits.length
  // const bagSize = list.bagSize
  //使用01优化多重背包
  const fruits = [{}]
  const bagSize = list.bagSize
  //获取一份list对象的副本
  const data = JSON.parse(JSON.stringify(list))
<<<<<<< HEAD
  //把水果分成多份,每份数量是2的幂次方
=======
  console.log(data.fruits)
>>>>>>> c42c92219fc179164a83d93a1f728307be5592c6
  for(let i=0;i<list.fruits.length;i++){
    let k = 1
    while(k<=data.fruits[i].quantity){
      data.fruits[i].quantity -= k
      let fruit = {
        name:data.fruits[i].name,
        price:data.fruits[i].price*k,
        volume:data.fruits[i].volume*k,
        index : i,
        quantity:k
      }
<<<<<<< HEAD
=======
      console.log(fruit)
>>>>>>> c42c92219fc179164a83d93a1f728307be5592c6
      fruits.push(fruit)
      k *= 2
    }
    if(data.fruits[i].quantity>0){
<<<<<<< HEAD
=======
      console.log(data.fruits[i])
>>>>>>> c42c92219fc179164a83d93a1f728307be5592c6
      let fruit = {
        name:data.fruits[i].name,
        price:data.fruits[i].price*data.fruits[i].quantity,
        volume:data.fruits[i].volume*data.fruits[i].quantity,
        index : i,
        quantity:data.fruits[i].quantity
      }
      fruits.push(fruit)
    }
  }

  const n = fruits.length
  const dp = []
<<<<<<< HEAD
  const selected = []  //记录哪些水果被选中
  for(let i=0;i<=n+1;i++){
    dp.push([])
    selected.push([])
=======
  for(let i=0;i<=n+1;i++){
    dp.push([])
>>>>>>> c42c92219fc179164a83d93a1f728307be5592c6
  }
  //初始化
  for(let i=0;i<=n;i++){
    for(let j=0;j<=bagSize;j++){
      dp[i][j] = 0
<<<<<<< HEAD
      selected[i][j] = false
=======
>>>>>>> c42c92219fc179164a83d93a1f728307be5592c6
    }
  }

  //把水果按照体积排序.从大到小
  fruits.sort((a,b)=>{
    return b.volume-a.volume
  })
  //开始计算,并获取哪些水果被选中
  for(let i=1;i<=n;i++){
    for(let j=0;j<=bagSize;j++){
      if(j>=fruits[i-1].volume){
        dp[i][j] = Math.max(dp[i-1][j],dp[i-1][j-fruits[i-1].volume]+fruits[i-1].price)
<<<<<<< HEAD
        if(dp[i][j] === dp[i-1][j-fruits[i-1].volume]+fruits[i-1].price){
          selected[i][j] = true
        }
=======
>>>>>>> c42c92219fc179164a83d93a1f728307be5592c6
      }else{
        dp[i][j] = dp[i-1][j]
      }
    }
  }
<<<<<<< HEAD
  //获取每种水果的数量
  const result = []
  for(let i=n,j=bagSize;i>0;i--){
    if(selected[i][j]){
      result.push(fruits[i-1])
      j -= fruits[i-1].volume
    }
  }
  const answer = []
  data.fruits.forEach((item)=>{
    answer.push({
      name:item.name,
      volume:item.volume,
      price:item.price,
      quantity:0
    })
  })
  result.forEach((item)=>{
    answer[item.index].quantity += item.quantity
  })
  console.log(answer)


  return {
    value:dp[n][bagSize],  //最大价值
    answer:answer  //每种水果的数量
  }
=======
  return dp[n][bagSize]
>>>>>>> c42c92219fc179164a83d93a1f728307be5592c6
}
