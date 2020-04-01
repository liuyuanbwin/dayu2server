const Linkman = require('../../../models/Linkman')
const Router = require('koa-router')
const router = new Router()
const resbody = require('../../../tools/resbody')

router.post('/', async ctx => {
  ctx.status = 200
  const newLinkman = new Linkman({
    name:ctx.request.body.name,
    tel:ctx.request.body.tel,
    agentId:ctx.$info.agentId,
    managerId:ctx.$info.id
  })

  await newLinkman.save().then(linkman => {
    ctx.body = resbody(0,linkman)
  })
  .catch(err => {
    console.log(err);
    ctx.body = resbody(40002)
  })
})

module.exports = router.routes()