const Router = require('koa-router')
const router = new Router()
const addlinkman = require('./add')
const linkmanslist = require('./list')

router.use('/add',addlinkman)
router.use('/list',linkmanslist)

module.exports = router.routes()