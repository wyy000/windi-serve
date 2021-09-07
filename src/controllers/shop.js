const {Router} = require('express')
const bodyParser = require("body-parser")

const shopService = require('../services/shop')
const {createShopFormSchema} = require('../moulds/ShopForm')
const cc = require('../utils/cc')

const SUCCESS_CODE = 0
const ERROR_CODE = 1

class ShopController {
  shopService

  async init () {
    this.shopService = await shopService()

    const router = Router()
    router.get('/', this.getAll)
    router.get('/:shopId', this.getOne)
    router.put('/:shopId', this.put)
    router.delete('/:shopId', this.delete)
    router.post('/', bodyParser.json(), this.post)
    return router
  }

  getAll = cc(async (req, res) => {
    const {pageNum, pageSize} = req.query
    const shopList = await this.shopService.find({pageNum, pageSize})

    res.send({code: SUCCESS_CODE, data: shopList})
  })

  getOne = cc(async (req, res) => {
    const {shopId} = req.params
    const shopList = await this.shopService.find({id: shopId})

    if (shopList) {
      res.send({code: SUCCESS_CODE, data: shopList})
    }
    else {
      res.status(404).send({success: false, data: null})
    }
  })

  post = cc(async (req, res) => {
    const {name} = req.body

    try {
      await createShopFormSchema().validate({name})
    } catch (e) {
      return res.status(400).send({code: 1, message: e.message})
    }

    const shopInfo = await this.shopService.create({name})

    if (!shopInfo) res.status(404).send({code: ERROR_CODE, data: null})
    else {
      res.send({code: SUCCESS_CODE, data: shopInfo})
    }
  })

  put = cc(async (req,  res) => {
    const {shopId} = req.params
    const {name} = req.query

    try {
      await createShopFormSchema().validate({name})
    } catch (e) {
      return res.status(400).send({code: 1, message: e.message})
    }

    const shopInfo = await this.shopService.modify({
      id: shopId,
      name: name,
    })

    if (shopInfo) {
      res.send({code: SUCCESS_CODE, data: shopInfo})
    }
    else {
      res.status(404).send({code: ERROR_CODE, data: null})
    }
  })

  delete = cc(async (req, res) => {
    const {shopId} = req.params
    const success = await this.shopService.delete({id: shopId})

    if (!success) res.status(404)
    else {
      res.send({code: SUCCESS_CODE})
    }
  })
}

module.exports = async () => {
  const controller = new ShopController()
  return await controller.init()
}