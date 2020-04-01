const Router = require('koa-router')
const router = new Router()
const key = require('../../../tools/config').tokenkey
const jwt = require('jsonwebtoken')
const Linkman = require('../../../models/Linkman')
const resbody = require('../../../tools/resbody')

router.post('/',async ctx => {
  ctx.status = 200

  const pageIndex = ctx.request.body.pageIndex || 1
  const pageSize = ctx.request.body.pageSize || 10
  var body = ctx.request.body
  console.log(body);

  // const token = ctx.header.authorization.split(' ')[1]
  // const info = await jwt.verify(token,key)
  const query ={}
  if(ctx.$info.type === 1){
    query.agentId = ctx.$info.agentId
  }else{
    query.managerId = ctx.$info.managerId
  }
  if(body.keyword){
    query.name = {$regex: eval(`/${body.keyword}/i`)}
  }

  console.log(query);

  const total = await Linkman.find(query).countDocuments()
  const findResult = await Linkman.find(query).sort({name:-1}).limit(pageSize).skip((pageIndex - 1) * pageSize)

  const result = []
  findResult.forEach(linkman => {
    linkman.id = linkman._id,
    delete linkman._id,
    result.push(linkman)
  })
  ctx.body = resbody(0,{linkmans:result,total})
})

module.exports = router.routes()