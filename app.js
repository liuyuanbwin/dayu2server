const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koajwt = require('koa-jwt')
const routes = require('./routes')
const mongoose = require('mongoose')
const keys = require('./tools/config')
const unAuth = require('./tools/unAuth')
const parseToken = require('./tools/parsetoken')

// database
mongoose
  .connect(keys.dburl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('数据库连接成功...')
  })
  .catch(err => {
    console.log(err)
  })

//处理未授权
unAuth(app)



// error handler
onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(
  koajwt({ secret: keys.tokenkey }).unless({
    path: [
      /^\/api\/agents\/login/,
      /^\/api\/agents\/agentlist/,
      /^\/api\/agents\/register/
    ]
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
//解析token
 parseToken(app)
app.use(
  views(__dirname + '/views', {
    extension: 'pug'
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(routes.routes(), routes.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
