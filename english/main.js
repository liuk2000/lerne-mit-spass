const express = require('express')
const dirTree = require('directory-tree')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000

app.get('/api/list/*', (req, res) => {
  console.log(req.url)
  const words = req.url.slice(10).split('/')
  console.log(words)
  if (words[0] === 'all') {
    res.send(JSON.stringify(list_dirs('data')))
  } else {
    if (!words[1]) {
      res.send(JSON.stringify(list_dirs(`data/${words[0]}`)))
    } else {
      if (!words[2]) {
        res.send(JSON.stringify(list_dirs(`data/${words[0]}/${words[1]}`)))
      } else {
        console.log(`data/${words[0]}/${words[1]}/${words[2]}`)
      }
    }
  }
})

app.get('/api/load/*', (req, res) => {
  console.log(req.url)
  const words = req.url.slice(10).split('/')
  console.log(words)
  let files = []
  let data = []
  if (words[0] === 'all') {
    files = getAllFiles('data')
  } else {
    if (!words[1] || words[1] === 'all') {
      files = getAllFiles(`data/${words[0]}`)
    } else {
      if (!words[2] || words[2] === 'all') {
        files = getAllFiles(`data/${words[0]}/${words[1]}`)
      } else {
        files = getAllFiles(`data/${words[0]}/${words[1]}/${words[2]}`)
      }
    }
  }
  for (const file of files) {
    data = data.concat(load_file(file))
  }
  res.send(JSON.stringify(data))
})

app.use('/', express.static('html'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const load_file = (filename) => {
  let rawdata = fs.readFileSync(filename);
  return JSON.parse(rawdata);
}

const list_dirs = (parent) => {
  return fs.readdirSync(parent, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

const getAllFiles = (dirPath, arrayOfFiles) => {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      if (file.endsWith('.json')) {
        arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
      }
    }
  })

  return arrayOfFiles
}