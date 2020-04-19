const config = require('../config')
const rq = require('request-promise')
const Token = require('../../models/Token')

//数据库读取 token
readToken = async (type) => {
    const data = await Token.findOne({type})
    console.log(`读取数据库token ${JSON.stringify(data)}`)
    return data
}

//数据库 保存 token 
saveToken = async (type,rdata) => {
    console.log(`保存的 token ${rdata}`)
    const data  = JSON.parse(rdata)
 const result = await Token.updateOne({type},{
     token:data[type],
     expires_in:data.expires_in,
     createTime:Date.now()
 },{
     upsert:true,
 })
}

//验证 token 是否过期
checkTokenExpire = (data) => {
    
    if(!data || !data.token || !data.expires_in){
        
        return false
    }

    const expire = (Date.now() - data.createTime.getTime()) / 1000

    if(expire > 7200){
        return false
    }

    return true
}

//请求 token 
requestToken = async (type) => {

    if(type === 'access_token'){
        const data = await rq(config.wx.baseUrl + config.wx.tokenUrl + '&appid=' + config.wx.appid + '&secret=' + config.wx.secret)
        console.log(`请求到的 token ${data}`)
        await saveToken(type,data)
        return data
    }else{
        const accdata = await getToken('access_token')
        const access_token = accdata.token
        const data = await rq(config.wx.baseUrl + config.wx.ticketUrl + 'access_token=' + access_token + '&type=jsapi')
    console.log(`请求到的 token ${data}`)
    await saveToken(type,data)
    return data
    }

    
}

//返回 token
getToken = async (type) => {
    var tokenData = await readToken(type)
    if(!checkTokenExpire(tokenData)){
        //过期重新申请
        tokenData = await requestToken(type)
        tokenData = await readToken(type)
        console.log(`返回 1 token ${tokenData}`)
        return tokenData
    }else{
        console.log(`返回 2 token ${tokenData}`)
        //未过期直接返回
        return tokenData         
    }
}

module.exports ={
    getToken
}