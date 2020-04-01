const Router = require('koa-router')
const router = new Router()
const InsuranceCompany = require('../../../models/InsuranceCompany')
const resbody = require('../../../tools/resbody')

router.post('/',async ctx => {
  ctx.body = 200
  const newCompany = new InsuranceCompany({
    name:ctx.request.body.name,
    servicetel:ctx.request.body.servicetel,
    agentId:ctx.request.body.agentId
  })

  await newCompany.save().then(company => {
    ctx.body = resbody(0,company)
  }).catch(err => {
    console.log(err);
    ctx.body = resbody(40002)
  })
})

module.exports =  router.routes()