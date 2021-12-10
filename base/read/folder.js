/*
 * @Author: savour humor
 * @Date: 2021-11-19 17:35:35
 * @Description: 读取文件夹下所有文件
 */
const fs = require('fs')
const path = require('path')

const filterType = (location) => {
  // '.vue', '.js', '.html', '.json', '.puml',
  return ['.png', '.less', '.jpg', '.yml', '.gif', '.ttf', '.css', '', '.md', '.jpeg'].includes(path.extname(location))
}

const readDir = (entry) => {
  const locations = []
  const readFolder = (entry) => {
    const dirInfo = fs.readdirSync(entry)

    dirInfo.forEach(item => {
      const location = path.join(entry, item)

      const info = fs.statSync(location)

      if (info.isDirectory()) {
        readFolder(location)
      } else {
        if (!filterType(location)) {
          locations.push(location)
        }
      }
    })
  }

  readFolder(entry)

  return locations
}


// filename
module.exports = readDir