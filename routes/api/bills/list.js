const Router = require('koa-router')
const router = new Router()
const Bill = require('../../../models/Bill')
const Car = require('../../../models/Car')
const Linkman = require('../../../models/Linkman')
const Company = require('../../../models/InsuranceCompany')
const resbody = require('../../../tools/resbody')
const moment = require('moment')


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

  if(body.expireDate){
    // query.expiredDate = {$gte:body.strartDate,$lt:body.endDate}
    // var mome = moment(body.expireDate + 'T16:00:00.000','YYYY-MM-DD HH:mm:ss');
    // var mome1 = moment(body.expireDate + 'T16:00:00.000','YYYY-MM-DD HH:mm:ss');
    var mome = moment(body.expireDate,'YYYY-MM-DD');
    var mome1 = moment(body.expireDate,'YYYY-MM-DD');
    query.expireDate = {$gte:mome,$lt:mome1.add(1,'d')}
  }

  console.log(query);

  const total = await Bill.find(query).countDocuments()
  const bills = await Bill.find(query).populate({path:'carId',model:Car}).populate({path:'companyId',model:Company}).populate({path:'linkmanId',model:Linkman}).sort({expireDate:1}).limit(pageSize).skip((pageIndex - 1) * pageSize).lean()
// .populate({path:'carId',model:Car})
  // console.log(bills);

  // const total = await Bill.find(query).countDocuments()
  // const bills = await Bill.find(query).sort({createDate:-1}).limit(pageSize).skip((pageIndex - 1) * pageSize).lean()

  // for (let i = 0;i<bills.length;i ++) {
  //   const car = await Car.findOne({_id:bills[i].carId})
  //   bills[i].car_no = car.carno
  //   const linkman = await Linkman.findOne({_id:bills[i].linkmanId})
  //   bills[i].linkman_name = linkman.name
  //   const company = await Company.findOne({_id:bills[i].companyId})
  //   bills[i].company_name = company.name
  // }

  ctx.body = resbody(0,{bills:bills,total})

})

module.exports = router.routes()