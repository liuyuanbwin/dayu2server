const Router = require('koa-router')
const router = new Router()
const Bill = require('../../../models/Bill')
const resbody = require('../../../tools/resbody')

router.post('/',async ctx => {
  const newBill = new Bill({
    carId:ctx.request.body.carId,
    type:ctx.request.body.type,
    companyId:ctx.request.body.companyId,
    price:ctx.request.body.price,
    linkmanId:ctx.request.body.linkmanId,
    remark:ctx.request.body.remark,
    agentId:ctx.$info.agentId,
    managerId:ctx.$info.id,
    expireDate:ctx.request.body.expireDate,
    createDate:ctx.request.body.createDate
  })

  await newBill.save().then(bill => {
    console.log(bill);
    ctx.body = resbody(0)
  })
  .catch(err => {
    console.log(err);
    ctx.body = resbody(40002)
  })
})

module.exports = router.routes()