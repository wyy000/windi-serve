const {Router} = require('express')
const fs = require('fs')
const cc = require("../utils/cc")

class ChaosController {
  async init () {
    const router = Router()
    router.get('/test', this.getExeclTest)
    return router
  }

  getExeclTest = cc(async (req, res) => {
    // 创建数据流
    const stream = fs.createReadStream ('./src/test.xlsx')
    // 将数据流通过管道传输给响应流
    stream.pipe (res)
    // res.send({code: 200, data: 'success'})
  })
}

module.exports = async () => {
  const c = new ChaosController()
  return await c.init()
}