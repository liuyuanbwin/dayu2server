const Router = require('koa-router')
const router = new Router()
const token = require('../../../tools/wx/accessToken')
const sign = require('../../../tools/wx/sign')

router.get('/',async ctx => {
    ctx.status = 200
    const ticket =await token.getToken('ticket')
    console.log(`query ${ctx.query.url}`)
    ctx.body = sign(ticket.token,ctx.query.url)
})

module.exports = router.routes()
