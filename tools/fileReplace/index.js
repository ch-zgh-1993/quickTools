/*
 * @Author: zhangguohua
 * @Date: 2021-11-23 11:54:59
 * @Description: 替换文件内容
 */
const fs = require('fs')
// const NodeMonkey = require("node-monkey")
const readDir = require('../../base/read/folder') 
const { readFile, writeFile } = require('../../base/read/file')
const readExcel = require('../../base/read/excel')


// NodeMonkey({
//   server: {
//     server: null, //指定已存在的服务器
//     host: '0.0.0.0', //指定IP地址
//     port: 50500, //指定端口
//     silent: false, 
//     bufferSize: 50, //缓冲区的大小
//     disableLocalOutput: true,
//   },
//   client: {
//     showCallerInfo: true, //是否显示回调信息，比如文件行号
//     convertStyles: true //将终端输出转换浏览器输出风格
//   },
// })

// 所有鹰眼对应关系
let testMap = {}
let testKeys
// 获取 excel 文件
const excelLocations = readDir('../../testFile/')

excelLocations.forEach((item) => {
  testMap = {
    ...testMap,
    ...readExcel(item)
  }
})
testKeys = Object.keys(testMap)
console.log(testKeys.length, '所有行数')


// 获取要修改的文件
const locations = readDir('../../../../test')

let changeFiles = 0
console.log(locations.length, '总文件数')
locations.forEach((item, index) => {
  // 记录文件是否改变
  let isChange = false

  // 读取文件
  readFile(item).then((chunk) => {
    let str = String(chunk)

    // 遍历 test 变量
    testKeys.forEach((val, i) => {
      const rg = new RegExp(val + '', 'g')
      if (str.indexOf(val) > -1) {
        if (isChange == false) {
          isChange = true
          changeFiles++
          console.log('改变文件===', changeFiles)
        }
        str = str.replace(rg, testMap[val])
      }
    })
    writeFile(str, item)
  })
})