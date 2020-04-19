const resbody = require('./resbody')
module.exports = (app) =>{
  app.use(async (ctx, next) =>{
    console.log(`unautho >>>>>>>`)
    return await next().catch((err) => {
      console.log(`get 401 ${err}`);
        if (401 == err.status) {
          
            ctx.status = 401;
            ctx.body = resbody(40005)
        } else {
            throw err;
        }
    });
  });
}
