// 读取 excel 文件
const xlsx = require('node-xlsx');
const fs = require('fs')

const readExcel = function (location) {
  // 读取文件
  const file = fs.readFileSync(location)

  // 解析得到文档中的所有 sheet
  var sheets = xlsx.parse(file);

  // 最终需要的结果
  const result = {}

  let tt = 0
  // 遍历 sheet
  sheets.forEach(function(sheet){
    // 读取每行内容
    for(var rowId in sheet['data']){
      if (rowId >= 1) {
        tt++
        var row = sheet['data'][rowId]
        const keys = Object.keys(result)
        if (!keys.includes(result[row[2]])) {
          result['' + row[2]] = row[3]
        } else {
          console.error('错误，已存在', result[row[2]])
        } 
      }
    }
  })
  // 计数
  console.log(tt, 'excel 总行数')
  return result
}

module.exports = readExcel

