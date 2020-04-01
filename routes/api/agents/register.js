const Router = require('koa-router')
const router = new Router()
const Agent = require('../../../models/Agent')
const bcrypt = require('bcryptjs')
const resbody = require('../../../tools/resbody')

router.post('/', async ctx => {
  ctx.status = 200
  const findResult = await Agent.find({ tel: ctx.request.body.tel })
  if (findResult.length > 0) {
    ctx.body = resbody(40001)
  } else {
    // 未注册
    const newAgent = new Agent({
      name: ctx.request.body.name,
      password: ctx.request.body.password,
      type: ctx.request.body.type,
      tel: ctx.request.body.tel,
      agentId: ctx.request.body.agentId
    })

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(newAgent.password, salt)
    newAgent.password = hash
    if (ctx.request.body.type == 1) {
      newAgent.agentId = newAgent._id
    }

    await newAgent
      .save()
      .then(agent => {
        ctx.body = resbody(0)
      })
      .catch(err => {
        ctx.body = resbody(40002)
      })
  }
})

module.exports = router.routes()
