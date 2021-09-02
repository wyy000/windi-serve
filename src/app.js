const express = require('express')
const path = require('path')
const {promisify} = require('util')

const initControllers = require('./controllers')

const serve = express()
const port = parseInt(process.env.PORT || '3000')
const publicDir = path.resolve('public')

async function bootStrap () {
  serve.use(express.static(publicDir))
  serve.use(await initControllers())
  await promisify(serve.listen.bind(serve, port))()
  console.log(`> Started at ${port}`)
}

bootStrap()
