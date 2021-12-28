const {Router} = require('express')
const shopController = require('./shop')
const chaosController = require('./chaos')
const loginController = require('./login')
const excelController = require('./excel')

module.exports = async function initControllers () {
  const router = Router()
  router.use('/api/shop', await shopController())
  router.use('/api/chaos', await chaosController())
  router.use('/api/login', await loginController())
  router.use('/api/excel', await excelController())
  return router
}