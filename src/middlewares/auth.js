const passport = require('passport')
const {Strategy: GithubStrategy} = require('passport-github')

const GITHUB_STRATEGY_OPTIONS = {
  clientID: '',
  clientSecret: '',
  callbackURL: 'http://localhost:3000/api/login/github/callback',
}

const githubStrategy = new GithubStrategy(
  GITHUB_STRATEGY_OPTIONS,
  (accessToken, refreshToken, profile, done) => {
    const user = {}
    done(null, user)
  }
)

passport.use(githubStrategy)

passport.serializeUser((user, done) => {
  const userId = '46e5'
  done(null, userId)
})

module.exports = function authMiddleware() {
  return [passport.initialize(), passport.session()]
}

Object.assign(module.exports, {passport})