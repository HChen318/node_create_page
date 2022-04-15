/**
 * Created by CH
 * time: 2022/03/22
 */

 const fs = require('fs')
 const path = require('path')
 const pageName = process.argv.splice(2)[0]
 const pathArr = pageName.split('/')
 let basepath = path.join(__dirname, '../page/')
 
 /*
  * 新建项目页面模板
  * @src param{ String } 目标源
  * @dst param{ String } 生成的模板 src/page/xxx
  */
 const copyDirectory = (src, dst) => {
   return new Promise((res, rej) => {
     if (fs.existsSync(src)) {
       fs.readdir(src, function(err, files) {
         if (err) {
           console.log(err)
           return
         }
         files.forEach(filename => {
           const url = path.join(src, filename)
           const dest = path.join(dst, filename)
           fs.stat(path.join(src, filename), function(err, stats) {
             if (err) throw err
             if (stats.isFile()) {
               let str = ''
 
               let readStream = fs.createReadStream(url)
               readStream.on('data', data => {
                 str += data
               })
               readStream.on('end', () => {
                 const pageNameStyle = pageName
                   .replace(/([A-Z])/g, '-$1')
                   .toLowerCase()
                   .substring(1)
                 str = str
                   .replace(/REPLACE_PAGE_NAME/g, pageName)
                   .replace(/REPLACE_PAGE_CLASS_NAME/g, pageNameStyle)
                 let writeStream = fs.createWriteStream(dest, {
                   encoding: 'utf8'
                 })
                 writeStream.write(str)
                 res('succ')
               })
             } else if (stats.isDirectory()) {
               existsFile(url, dest, copyDirectory)
             }
           })
         })
       })
     } else {
       console.log('file directory does not exist !')
       return
     }
   })
 }
 
 const existsFile = (url, dest, callback) => {
   fs.exists(dest, function(exists) {
     if (exists) {
       callback && callback(url, dest)
     } else {
       fs.mkdir(dest, 0777, function(err) {
         if (err) throw err
         callback && callback(url, dest)
       })
     }
   })
 }
 
 const exists = () => {
   return new Promise((res, rej) => {
     ;(async function() {
       let fileExistflag = true
       for (let a of pathArr) {
         if (fs.existsSync(basepath + a)) {
           basepath = `${basepath}${a}/`
           fileExistflag = false
         } else {
           await mkdir(a)
         }
       }
       if (fileExistflag) {
         res(basepath)
       } else {
         rej('file directory exists !')
       }
     })()
   })
 }
 
 const mkdir = a => {
   return new Promise((res, rej) => {
     fs.mkdir(basepath + a, err => {
       if (err) rej(err)
       console.log(`${basepath}${a}/`)
       basepath = `${basepath}${a}/`
       res(basepath)
     })
   })
 }
 
 const creatPage = async () => {
   try {
     await exists()
     await copyDirectory(path.join(__dirname, './page'), basepath)
     return console.log(`Successfully created ${pageName} page!`)
   } catch (err) {
     console.error(err)
   }
 }
 
 creatPage()
 