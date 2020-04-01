const Router = require('koa-router')
const router = new Router()
const add = require('./add')
const list = require('./list')

router.use('/add',add)
router.use('/list',list)

module.exports = router.routes()