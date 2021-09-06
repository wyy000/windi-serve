const {normalize} = require('path')
const {parse, format} = require('url')

module.exports = function urlNormalizeMiddleware () {
  return (req, res, next) => {
    const pathname = normalize(req.path).split('\\').join('/')
    const urlParsed = parse(req.url)

    let shouldRedirect = false

    if (req.path !== pathname) {
      urlParsed.pathname = pathname
      shouldRedirect = true
    }

    shouldRedirect ? res.redirect(format(urlParsed)) : next()
  }
}