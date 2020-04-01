const msg = require('./errors')
module.exports = (code,body) => {
  return {
  result:code,
  data:body || {},
  message:msg(code)
  }
}