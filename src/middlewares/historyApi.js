const history = require('connect-history-api-fallback')

module.exports = function historyApi () {
  return history({
    rewrites: [
      {
        from: /^\/api\/.*$/,
        to: function(context) {
          return context.parsedUrl.path
        },
      }
    ]
  })
}