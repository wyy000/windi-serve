const {Router} = require('express')
const bodyParser = require('body-parser')
const cc = require('../utils/cc')

const SUCCESS_CODE = 0

class LoginController {
  async init () {
    const router = Router()
    router.post('/', bodyParser.json(), this.post)
    return router
  }

  post = cc((req, res) => {
    req.session.logined = true
    const {name} = req.body
    res.send({code: SUCCESS_CODE, data: {name: 1}})
  })
}

module.exports = async () => {
  const c = new LoginController()
  return c.init()
}
