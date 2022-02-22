// 引入fs模块
const fs = require('fs')

// 读文件

// 回调函数形式
// fs.readFile('./resouce/content.txt',(err,data)=>{
//   // 如果错误，抛出错误
//   if(err) throw err
//   // 输出文件内容
//   console.log(data.toString())
// })

// promise形式
let p = new Promise((resolve,reject)=>{
  // 读文件
  fs.readFile('./resource/content.txt',(err,data)=>{
    // 如果错误
    if(err) reject(err)
    // 如果成功
    resolve(data)
  })
})

// 操作完成之后，调用then方法
p.then((value)=>{
  console.log(value.toString())
},(reason)=>{
  console.log(reason.toString())
})