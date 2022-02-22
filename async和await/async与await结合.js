const fs = require('fs')
const util = require('util')
const mineReadFile = util.promisify(fs.readFile)

async function main() {
  // 分别读取三个文件的内容
  try {
    let data1 = await mineReadFile('./resource/1.txt')
    let data2 = await mineReadFile('./resource/2.txt')
    let data3 = await mineReadFile('./resource/3.txt')
    console.log(data1 + data2 + data3)
  } catch (error) {
    console.log(error)
  }
}

main()