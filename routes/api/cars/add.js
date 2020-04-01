const Router = require('koa-router')
const router = new Router()
const Car = require('../../../models/Car')
const resbody = require('../../../tools/resbody')

router.post('/', async ctx => {
  ctx.status = 200
  const newCar = new Car({
    carno:ctx.request.body.carno,
    checkDate:ctx.request.body.checkDate,
    managerId:ctx.$info.id,
    agentId:ctx.$info.agentId,
    type:ctx.request.body.type,
    linkmans:ctx.request.body.linkmans
  })

  await newCar.save().then(car => {
    ctx.body=resbody(0,car)
  })
  .catch(err => {
    console.log(err);
    ctx.body = resbody(40002)
  })
})

module.exports = router.routes()