const rq = require('request-promise')
const config = require('../config')

auth = async (code)=>{
    const result =await rq(`${config.wx.baseUrl}${config.wx.oauthUrl}appid=${config.wx.appid}&secret=${config.wx.secret}&code=${code}&grant_type=authorization_code`)
    console.log(result)
    return result
}

module.exports = {
    auth
}