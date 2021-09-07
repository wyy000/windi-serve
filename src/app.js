const express = require('express')
const path = require('path')
const {promisify} = require('util')

const initMiddlewares = require('./middlewares')
const initControllers = require('./controllers')

const serve = express()
const port = parseInt(process.env.PORT || '3000')
const publicDir = path.resolve('public')

async function bootStrap () {
  serve.use(express.static(publicDir))
  serve.use(await initMiddlewares())
  serve.use(await initControllers())
  await promisify(serve.listen.bind(serve, port))()
  console.log(`> Started at ${port}`)
}

process.on("unhandledRejection", (err) => {
  console.error(err)
  process.exit(1)
})

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  console.error(err)
  res.redirect('/500.html')
}

bootStrap()
