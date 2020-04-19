const Router = require('koa-router')
const router = new Router()

router.get('/',async ctx => {
    console.log('sssss')
    // console.log(ctx.query.echostran )
    ctx.status = 200
    // console.log(ctx)
    ctx.body = ctx.request.query.echostr
})

module.exports = router.routes()