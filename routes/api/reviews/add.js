const Router = require('koa-router')
const router = new Router()
const Review = require('../../../models/Review')
const resbody = require('../../../tools/resbody')

router.post('/', async ctx => {
  ctx.status = 200
  console.log(ctx.$info.id);
  const newReivew = new Review({
    managerId:ctx.$info.id,
    agentId:ctx.$info.agentId,
    linkmanId:ctx.request.body.linkmanId,
    content:ctx.request.body.content,
    carId:ctx.request.body.carId
  })

  await newReivew.save().then(review => {
    ctx.body = resbody(0,review)
  })
  .catch(err => {
    console.log(err);
    ctx.body = resbody(40002)
  })
})

module.exports = router.routes()