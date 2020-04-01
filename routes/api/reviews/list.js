const Router = require('koa-router')
const router = new Router()
const Review = require('../../../models/Review')
const Car = require('../../../models/Car')
const Linkman = require('../../../models/Linkman')
const resbody = require('../../../tools/resbody')

router.post('/',async ctx => {
  ctx.status = 200
  const reviews = await Review.find({}).populate({path:'carId',model:Car}).populate({path:'linkmanId',model:Linkman}).sort({createDate:1})
  ctx.body = resbody(0,{reviews})
})

module.exports = router.routes()