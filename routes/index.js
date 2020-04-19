const Router = require('koa-router')
const api = require('./api')
const wx = require('./wx')
const router = new Router()
router.use('/api',api)
router.use('/wx',wx)
module.exports = router