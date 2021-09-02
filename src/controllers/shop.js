const {Router} = require('express')
const shopService = require('../services/shop')

class ShopController {
  shopService

  async init () {
    this.shopService = await shopService()

    const router = Router()
    router.get('/', this.getAll)
    router.get('/:shopId', this.getOne)
    router.put('/:shopId', this.put)
    router.delete('/:shopId', this.delete)
    return router
  }

  getAll = async (req, res) => {
    const {pageNum, pageSize} = req.query
    const shopList = await this.shopService.find({pageNum, pageSize})

    res.send({success: true, data: shopList})
  }

  getOne = async (req, res) => {
    const {shopId} = req.params
    const shopList = await this.shopService.find({id: shopId})

    if (shopList) {
      res.send({success: true, data: shopList})
    }
    else {
      res.status(404).send({success: false, data: null})
    }
  }

  put = async (req,  res) => {
    const {shopId} = req.params
    const {name} = req.query
    const shopInfo = await this.shopService.modify({
      id: shopId,
      name: name,
    })

    if (shopInfo) {
      res.send({success: true, data: shopInfo})
    }
    else {
      res.status(404).send({success: false, data: null})
    }
  }

  delete = async (req, res) => {
    const {shopId} = req.params
    const success = await this.shopService.delete({id: shopId})

    if (!success) res.status(404)
    else {
      res.send({success})
    }
  }
}

module.exports = async () => {
  const controller = new ShopController()
  return await controller.init()
}