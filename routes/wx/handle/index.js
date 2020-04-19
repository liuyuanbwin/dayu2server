const Router = require('koa-router')
const router = new Router()
const verify = require('./verify')
const test = require('./test')
const oauth = require('./oauth')

router.use('/verify',verify)
router.use('/test',test)
router.use('/oauth',oauth)

module.exports = router.routes()
