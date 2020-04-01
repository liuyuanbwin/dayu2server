const Router = require('koa-router')
const router = new Router ()
const Bill = require('../../../models/Bill')
const Car = require('../../../models/Car')
const Agent = require('../../../models/Agent')
const Linkman = require('../../../models/Linkman')
const Company = require('../../../models/InsuranceCompany')
const resbody = require('../../../tools/resbody')


router.post('/',async ctx => {
  ctx.status = 200
  const body = ctx.request.body
  var query = {}
  if(ctx.$info.type === 1){
    query.agentId = ctx.$info.agentId
  }else{
    query.manageId = ctx.$info.id
  }

  query._id = body.billId
  console.log(body.billId);

  const bill = await Bill.findOne(query).populate({path:'carId',model:Car}).populate({path:'companyId',model:Company}).populate({path:'linkmanId',model:Linkman}).lean()




  ctx.body = resbody(0,bill)
})

module.exports = router.routes()