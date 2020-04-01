const Router = require('koa-router')
const Car = require('../../../models/Car')
const resbody = require('../../../tools/resbody')
const key = require('../../../tools/config').tokenkey
const jwt = require('jsonwebtoken')

const router = new Router()

router.post('/', async ctx => {
  ctx.status = 200

  const pageIndex = ctx.request.body.pageIndex || 1
  const pageSize = ctx.request.body.pageSize || 10000

  var body = ctx.request.body
  // const token = ctx.header.authorization.split(' ')[1]
  // const info = await jwt.verify(token,key)

  var query = {}
  if(ctx.$info.type === 1){
    query.agentId = ctx.$info.agentId
  }else{
    query.managerId = ctx.$info.id
  }
  if(body.keyword){
    query.carno = {$regex: eval(`/${body.keyword}/i`)}
  }

  console.log(query);

  const total = await Car.find(query).countDocuments()
  const findResult = await Car.find(query).sort({createDate:-1}).limit(pageSize).skip((pageIndex - 1) * pageSize)

    let result = []
    findResult.forEach( car => {
      car.id = car._id
      result.push(car)
    })

   ctx.body = resbody(0,{cars:result,total})
})

module.exports = router.routes()