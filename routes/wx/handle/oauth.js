const Router = require('koa-router')
const router = new Router()
const oauth = require('../../../tools/wx/oauth')
const WxClient = require('../../../models/WxClient')
const resbody = require('../../../tools/resbody')

router.get('/',async ctx => {
    ctx.status = 200
    const tokenstr = await oauth.auth(ctx.query.code)
    const token = JSON.parse(tokenstr)
    if(token.errcode){
        ctx.body = resbody(60001)
    }else{
        const result = await WxClient.updateOne({openId:token.openid},{
            accessToken:token.access_token,
            refreshToken:token.refresh_token,
            accessTokenCreateDate:Date.now()
        },{
            upsert:true
        })
        console.log(result)
        ctx.body = resbody(0)
    }
})

module.exports = router.routes()