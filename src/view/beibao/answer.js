
export function knapsack(list) {  //获取最大价值,并返回每种水果的数量,参数是水果的数组
  // const n = list.fruits.length
  // const bagSize = list.bagSize
  //使用01优化多重背包
  const fruits = [{}]
  const bagSize = list.bagSize
  //获取一份list对象的副本
  const data = JSON.parse(JSON.stringify(list))
  console.log(data.fruits)
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
      console.log(fruit)
      fruits.push(fruit)
      k *= 2
    }
    if(data.fruits[i].quantity>0){
      console.log(data.fruits[i])
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
  for(let i=0;i<=n+1;i++){
    dp.push([])
  }
  //初始化
  for(let i=0;i<=n;i++){
    for(let j=0;j<=bagSize;j++){
      dp[i][j] = 0
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
      }else{
        dp[i][j] = dp[i-1][j]
      }
    }
  }
  return dp[n][bagSize]
}
