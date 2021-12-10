/*
 * @Author: zhangguohua
 * @Date: 2021-11-19 17:35:17
 * @Description: 读取文件内容
 */
const fs = require('fs')

const readFile = function (location) {
  return new Promise((resolve, reject) => {
    if (!location || typeof location !== 'string') reject('location is not right')

    let rs = fs.createReadStream(location, 'utf-8')

    rs.on('data', (chunk) => {
      resolve(chunk)
    })

    rs.on('end', () => {
      // console.log('end')
    })

    rs.on('error', (err) => {
      console.log('error', err)
    })
  })
}

// content 写入内容
// location 写入地址
const writeFile = function (content, location) {
  const ws = fs.createWriteStream(location, 'utf-8')
  ws.write(content)

  ws.end()
}

// 文件地址
module.exports = {
  readFile,
  writeFile
}