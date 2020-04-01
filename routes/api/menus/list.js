const Router = require('koa-router')
const resbody = require('../../../tools/resbody')
const jwt = require('jsonwebtoken')
const key = require('../../../tools/config').tokenkey

const router = new Router()
router.get('/', async ctx => {
  console.log(ctx.$info);
  const token = ctx.header.authorization.split(' ')[1]
  await jwt.verify(token, key, async (err, decode) => {
    if (err) ctx.body = resbody(40005)
    switch (decode.type) {
      case 1:
        //超管
        ctx.body = resbody(0, {
          menus: [{
              id: 1,
              title: '工作台',
              url: '/workbench'
            },
            {
              id: 2,
              title: '车辆管理',
              url: '/carlist'
            },
            {
              id: 3,
              title: '订单管理',
              url: '/billlist'
            },
            {
              id: 4,
              title: '联系人管理',
              url: '/linkmanslist'
            },{
              id:5,
              title:'回访管理',
              url:'/reviewlist'
            }
            // {
            //   id: 3,
            //   title: '车辆管理',
            //   url: '/carmanager',
            //   children: [{
            //     id: 21,
            //     title: '新增车辆',
            //     url: '/addcar',
            //   },{
            //     id: 22,
            //     title: '车辆列表',
            //     url: '/carlist',
            //   },{
            //     id:23,
            //     title:'车辆详情',
            //     url:'/catdetail'
            //   }]
            // },{
            //   id: 4,
            //   title: '订单管理',
            //   url: '/billmanager',
            //   children: [{
            //     id: 40,
            //     title: '新增订单',
            //     url: '/addbill',
            //   },{
            //     id: 41,
            //     title: '验车订单',
            //     url: '/checkcar',
            //   },{
            //     id: 42,
            //     title: '商业险订单',
            //     url: '/gapbill',
            //   },{
            //     id: 43,
            //     title: '交强险订单',
            //     url: '/clibill',
            //   },{
            //     id: 44,
            //     title: '所有订单',
            //     url: '/billlist',
            //   }]
            // },{
            //   id: 5,
            //   title: '联系人管理',
            //   url: '/linkmanmanager',
            //   children: [{
            //     id: 51,
            //     title: '联系人列表',
            //     url: '/linkmanslist'
            //   }]
            // }
          ]
        })
        break;

      default:
        break;
    }
  })
})
module.exports = router.routes()