const Router = require('koa-router')
const router = new Router()
const Company = require('../../../models/InsuranceCompany')
const resbody = require('../../../tools/resbody')
const key = require('../../../tools/config').tokenkey
const jwt = require('jsonwebtoken')

router.post('/',async ctx => {
  ctx.status = 200
  var query ={agentId:ctx.$info.agentId}
  if (ctx.request.body.keyword) {
    query.name = {$regex:eval(`/${ctx.request.body.keyword}/i`)}
  }
  const findResult = await Company.find(query)
  findResult.forEach(item => {
    item.id = item._id,
    delete item._id,
    delete item.__v
  })
  ctx.body = resbody(0,{companies:findResult})
})

module.exports = router.routes()