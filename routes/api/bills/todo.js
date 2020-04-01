const Router = require('koa-router')
const router = new Router()
const Bill = require('../../../models/Bill')
const Car = require('../../../models/Car')
const Linkman = require('../../../models/Linkman')
const Company = require('../../../models/InsuranceCompany')
const resbody = require('../../../tools/resbody')
const comment = require('moment')

var getmonthCount = (myMonth)=>{ 
  var now = new Date(); //当前日期 
  var nowDayOfWeek = now.getDay(); //今天本周的第几天 
  var nowDay = now.getDate(); //当前日 
  var nowMonth = now.getMonth(); //当前月 
  var nowYear = now.getYear(); //当前年 
  nowYear += (nowYear < 2000) ? 1900 : 0; //
  var monthStartDate = new Date(nowYear, myMonth, 1); 
  var monthEndDate = new Date(nowYear, myMonth + 1, 1); 
  var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24); 
  return days; 
  }

router.post('/', async ctx => {

  var now = new Date(); //当前日期 
  var nowDayOfWeek = now.getDay(); //今天本周的第几天 
  var nowDay = now.getDate(); //当前日 
  var nowMonth = now.getMonth(); //当前月 
  var nowYear = now.getYear(); //当前年 
  nowYear += (nowYear < 2000) ? 1900 : 0; //


  ctx.status = 200

  const pageIndex = ctx.request.body.pageIndex || 1
  const pageSize = ctx.request.body.pageSize || 10000

  const body = ctx.request.body
  var query = {}

  if(ctx.$info.type === 1){
    query.agentId = ctx.$info.agentId
  }else{
    query.manageId = ctx.$info.manageId
  }

  if(body.type && body.type !== 4){
    query.type = body.type
  }

  const days = []
  var total = 0

  var monthStartDate = new Date(nowYear, nowMonth, 1); //本月开始 
  var daycount = getmonthCount(nowMonth)
    for(let i = 0;i < daycount; i ++){
      query.expireDate = {$gte:new Date(nowYear, nowMonth, 1+i),$lt:new Date(nowYear, nowMonth, 2 + i)}
      const day = comment(new Date(nowYear, nowMonth, 1+i)).format('YYYY-MM-DD')
      const count = await Bill.find(query).countDocuments()
      days.push({day,count,id:i})
      total += count
    }

  // for(let i = 0;i < 7; i ++){
  //   query.expireDate = {$gte:new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1 + i),$lt:new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 2 + i)}
  //   const day = comment(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1 + i)).format('YYYY-MM-DD')
  //   const count = await Bill.find(query).countDocuments()
  //   days.push({day,count,id:i})
  //   total += count
  // }

  ctx.body = resbody(0,{days,total})
})

module.exports = router.routes()