const Router = require('koa-router')
const router = new Router()
const Agent = require('../../../models/Agent')
const resbody = require('../../../tools/resbody')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const key = require('../../../tools/config').tokenkey

router.post('/',async ctx => {
  
  ctx.status = 200

  const findResult = await Agent.find({tel:ctx.request.body.tel})
  
  if (findResult.length > 0) {

    let agent = findResult[0]
    let password = ctx.request.body.password
    let result = await bcrypt.compareSync(password,agent.password)

    if (result) {

      //生成 token 返回
      let payload ={
        id:agent._id,
        type:agent.type,
        name:agent.name,
        agentId:agent.agentId,
        managerId:agent.managerId
      }

      let token = jwt.sign(payload,key,{
        expiresIn:60*60*30
      })
      ctx.body = resbody(0,{
        token,
        userinfo:{
          name:agent.name,
          type:agent.type,
          agentId:agent.agentId,
          managerId:agent.managerId
        }
      })

    }else{
      ctx.body = resbody(40004)
    }

  }else{
    ctx.body =  resbody(40003)
  }
})

router.post('/info',async ctx => {
  ctx.body = resbody(0)
})

module.exports = router.routes()