const Router = require('koa-router')
const router = new Router()
const Bill = require('../../../models/Bill')
const Car = require('../../../models/Car')
const Linkman = require('../../../models/Linkman')
const Company = require('../../../models/InsuranceCompany')
const resbody = require('../../../tools/resbody')
const comment = require('moment')

router.post('/',async ctx => {
  ctx.status = 200

  const body = ctx.request.body

  var carquery = {}
  var linkmanquery = {}

  if(ctx.$info.type === 1){

    carquery.agentId = ctx.$info.agentId
    linkmanquery.agentId = ctx.$info.agentId

    if(body.keyword){
      carquery = {$and:[
        {agentId:ctx.$info.agentId},
        {carno:{$regex: eval(`/${body.keyword}/i`)}}
      ]}

      linkmanquery = {$and:[
        {agentId:ctx.$info.agentId},
        {$or:[{name:{$regex: eval(`/${body.keyword}/i`)}},{tel:{$regex: eval(`/${body.keyword}/i`)}}]}
      ]}
    }

  }else{

    carquery.manageId = ctx.$info.manageId
    linkmanquery.manageId = ctx.$info.manageId

    if (body.keyword) {
      carquery = {$and:[
        {manageId:ctx.$info.manageId},
        {carno:{$regex: eval(`/${body.keyword}/i`)}}
      ]}
  
      linkmanquery = {$and:[
        {manageId:ctx.$info.manageId},
        {$or:[{name:{$regex: eval(`/${body.keyword}/i`)}},{tel:{$regex: eval(`/${body.keyword}/i`)}}]}
      ]}
    }
  }

  const cars = await Car.find(carquery).limit(10)

  const linkmans = await Linkman.find(linkmanquery).limit(10)

  ctx.body = resbody(0,{cars,linkmans})
})

module.exports = router.routes()