const Router = require('koa-router')
const router = new Router()
const handle = require('./handle')

router.use('/handle',handle)

module.exports = router.routes() 