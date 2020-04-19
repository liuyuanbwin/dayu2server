const Router = require('koa-router')
const router = new Router ()
const Bill = require('../../../models/Bill')
const Car = require('../../../models/Car')
const Agent = require('../../../models/Agent')
const Linkman = require('../../../models/Linkman')
const Company = require('../../../models/InsuranceCompany')
const Review = require('../../../models/Review')
const resbody = require('../../../tools/resbody')

//标记订单时效状态
const marketbill = (date)=>{
  const overtime = (new Date() - date)  / (1000 * 60 * 60 * 24) 
  var remind = ''
  if (overtime >= 0) {
     remind = 'expired'
  }else{
    if (overtime > -30) {
       remind = 'tip'
    }
    if(overtime > -7){
       remind = 'warning'
    }
  }
  return remind
}
//验证验车是否过期
const checkExpire = (date,billDate) => {
console.log('sskfjaksfjkasj')
  const dt = new Date(date)

  const y = dt.getFullYear() + 1
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  const expiredDateString = `${y}-${m}-${d} ${hh}:${mm}:${ss}`

  const expiredDate = new Date(expiredDateString)

  const overtime = (billDate - date)  / (1000 * 60 * 60 * 24) 
  var remind = ''
  if (overtime >= 0) {
     remind = 'expired'
  }else{
    if (overtime > -30) {
       remind = 'tip'
    }
    if(overtime > -7){
       remind = 'warning'
    }
  }
  return remind

}
//降序排列
const descendExpireDate = (a, b) => {
  return a.sortDate < b.sortDate ? 1 : -1
}
//查找指定订单
const findBillById = (bills, id) => {
  for(var i = 0;i < bills.length;i ++){
    if(bills[i]._id == id) return i
  }
  return -1
}

router.post('/',async ctx => {
  ctx.status = 200
  const body = ctx.request.body
  const car = await Car.findOne({_id:body.carId}).lean()
  const bills = await Bill.find({carId:car._id}).populate({path:'carId',model:Car}).populate({path:'companyId',model:Company}).populate({path:'linkmanId',model:Linkman}).sort({createDate:-1}).lean()

 
  
  const reviews = await Review.find({carId:car._id}).populate({path:'linkmanId',model:Linkman}).populate({path:'agents',model:Agent}).lean()

  var events = []

  bills.forEach(item => {
    item.etype = 'bill',
    item.sortDate=item.expireDate,
    events.push(item)
  })

  reviews.forEach(item => {
    item.etype = 'review',
    item.sortDate = item.createDate,
    events.push(item)
  })

  events.sort(descendExpireDate)


  //订单日期排序
  bills.sort(descendExpireDate)
  
  const clis = bills.filter(item => item.type === 1)
  const gaps = bills.filter(item => item.type === 2)
  const checkcars = bills.filter(item => item.type === 3)

  clis.sort(descendExpireDate)

  gaps.sort(descendExpireDate)

  checkcars.sort(descendExpireDate)

//
  if (clis.length) {
    var lastcli = clis[0]
    lastcli.remind = marketbill(lastcli.expireDate)
    events.splice(findBillById(events,lastcli._id),1,lastcli)
  }

  if (gaps.length) {
    var lastgap = gaps[0]
    lastgap.remind = marketbill(lastgap.expireDate)
    events.splice(findBillById(events,lastgap._id),1,lastgap)
  }

 if (checkcars.length) {
    var lastcheckcar = checkcars[0] 
    lastcheckcar.remind =  checkExpire(car.checkDate,lastcheckcar.expireDate)
    events.splice(findBillById(events,lastcheckcar._id),1,lastcheckcar)
  }else{
    car.checkneed = true
  }

  car.events = events
 ctx.body = resbody(0,car)
})

module.exports = router.routes()