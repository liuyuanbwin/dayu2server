const Router = require('koa-router')
const add = require('./add')
const list = require('./list')
const detail = require('./detail')

const router = new Router()

router.use('/add', add)
router.use('/list',list)
router.use('/detail',detail)

module.exports = router.routes()
