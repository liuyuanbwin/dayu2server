const key = require('./config').tokenkey
const jwt = require('jsonwebtoken')
const resbody = require('./resbody')

module.exports = (app) => {
  app.use(async (ctx,next) => {


     console.log(ctx.url.indexOf('/wx'))
      if(ctx.url === '/api/agents/login' || ctx.url.indexOf('/wx') == 0 || ctx.url === '/favicon.ico'){
        await next()
      }else{
        const token = ctx.header.authorization.split(' ')[1]
        try {
          const info = await jwt.decode(token,key)
          ctx.$info = info
        await next()
        } catch (error) {
          console.log(error);
          ctx.status = 401;
          ctx.body = resbody(40005)
        }
      }
  
   
  })
}