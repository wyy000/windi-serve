const {Router} = require('express')
const bodyParser = require('body-parser')
const cc = require('../utils/cc')
const {passport} = require('../middlewares/auth')

const SUCCESS_CODE = 0

class LoginController {
  homepagePath
  loginPath

  async init () {
    const router = Router()
    router.post('/', bodyParser.json(), this.post)
    router.get('/github', passport.authenticate('github', {scope: ['read:user']}))
    router.get('/github/callback', passport.authenticate('github', {failureRedirect: this.loginPath}), this.getGithubCallback)
    return router
  }

  post = cc((req, res) => {
    req.session.logined = true
    const {name} = req.body
    res.send({code: SUCCESS_CODE, data: {name: 1}})
    // res.redirect(this.homepagePath)
  })

  getGithubCallback = (req, res) => {
    req.session.logined = true
    // res.redirect(this.homepagePath)
    res.send({code: SUCCESS_CODE, data: {name: 1}})
  }
}

module.exports = async (homepagePath = '/index.html', loginPath = '/login') => {
  const c = new LoginController()
  Object.assign(c, {homepagePath, loginPath})
  return c.init()
}
