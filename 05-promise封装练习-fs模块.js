/**
 * 封装一个函数，用来读取文件
 * 参数：path 文件路径
 * 返回：promise对象
 */
function mineReadFile(path) {  
  return new Promise((resolve,reject)=>{
    require('fs').readFile(path,(err,data)=>{
      // 如果错误,执行reject
      if(err) reject(err)
      // 如果成功,执行resolve
      resolve(data)
    })
  })
}

// 因为返回一个promise对象，所以可以在执行函数后边直接调用then方法
mineReadFile('./resource/content.txt').then((value)=>{
  console.log(value.toString())
},(reason)=>{
  console.log(reason.toString())
})