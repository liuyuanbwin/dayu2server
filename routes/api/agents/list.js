const Router = require('koa-router')
const router = new Router()
const Agent = require('../../../models/Agent')
const resbody = require('../../../tools/resbody')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const key = require('../../../tools/config').tokenkey

router.get('/', async ctx => {
  ctx.status = 200

  const findResult = await Agent.find({ type: 1 })

  if (findResult) {
    let result = []
    findResult.forEach(item => {
      result.push({
        id: item._id,
        name: item.name
      })
    })
    ctx.body = resbody(0, { agentlist: result })
  } else {
    ctx.body = resbody(1)
  }
})

module.exports = router.routes()
