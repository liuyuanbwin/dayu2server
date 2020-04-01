const Router = require('koa-router')
const list = require('./list')

const router = new Router()
router.use('/list',list)
module.exports = router.routes()