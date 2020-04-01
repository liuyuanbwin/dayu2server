const Router = require('koa-router')
const router = new Router()
const Agent = require('../../../models/Agent')
const resbody = require('../../../tools/resbody')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const key = require('../../../tools/config').tokenkey

router.post('/', async ctx => {
  ctx.status = 200
  const token = ctx.header.authorization.split(' ')[1]
  const info = await jwt.verify(token, key)
  const operate = ctx.request.body.operate
  switch (operate) {
    case 'find':
      const querys = await Agent.find({
        agentId:info.id,
        type:ctx.request.body.type
      })
      const agents = []
      querys.forEach( agent => {
        agents.push({
          id:agent._id,
          status:agent.status,
          expire_date:agent.expireDate,
          create_date:agent.createDate,
          name:agent.name,
          tel:agent.tel
        })
      })
      ctx.body = resbody(0,agents)
      break;
    case 'delet':

    break;
    case 'update':

    break;
    default:

      break;
  }
})

module.exports = router.routes()
