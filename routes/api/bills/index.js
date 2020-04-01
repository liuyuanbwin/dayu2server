const Router = require('koa-router')
const router = new Router()
const add = require('./add')
const list = require('./list')
const detail = require('./detail')
const todo = require('./todo')

router.use('/add',add)
router.use('/list',list)
router.use('/detail',detail)
router.use('/todo',todo)

module.exports = router.routes()