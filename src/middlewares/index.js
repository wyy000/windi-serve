const {Router} = require('express')
const cookieParser = require('cookie-parser')
const sessionMiddleware = require('./session')
const urlNormalizeMiddleware = require('./urlNormalize')
const historyApiMiddleware = require('./historyApi')

const secret = '842d918ced1888c65a650f993077c3d36b8f114d'

module.exports = async function initMiddlewares () {
  const router = Router()
  router.use(urlNormalizeMiddleware())
  router.use(cookieParser(secret))
  router.use(sessionMiddleware(secret))
  router.use(historyApiMiddleware())
  return router
}