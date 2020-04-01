const Router = require('koa-router')
const router = new Router()
const Agent = require('../../../models/Agent')
const resbody = require('../../../tools/resbody')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const key = require('../../../tools/config').tokenkey

router.post('/', async ctx => {
  let token = ctx.header.authorization.split(' ')[1]
  let info = jwt.decode(token)
  await jwt.verify(token, key, async (err, decoded) => {
    if (err) ctx.body = resbody(40005)

    const agentId = decoded.id
    const findResult = await Agent.find({
      _id: agentId
    })
    if (findResult.length > 0) {
      let agent = findResult[0]
      ctx.body = resbody(0, {
        id:agent._id,
        name: agent.name,
        type: agent.type,
        agentId:agent.agentId
      })
    } else {
      ctx.body = resbody(40005)
    }
  })
})

module.exports = router.routes()