const {Router} = require('express')
const shopController = require('./shop')
const chaosController = require('./chaos')
const loginController = require('./login')
const execlController = require('./execl')

module.exports = async function initControllers () {
  const router = Router()
  router.use('/api/shop', await shopController())
  router.use('/api/chaos', await chaosController())
  router.use('/api/login', await loginController())
  router.use('/api/execl', await execlController())
  return router
}