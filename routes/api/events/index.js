const Router  = require('koa-router')
const router = new Router()
const magicsearch = require('./magicsearch')

router.use('/chaos',magicsearch)
module.exports = router.routes()