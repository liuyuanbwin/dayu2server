const mongoose = require('mongoose')

const Schema = mongoose.Schema

const WxClientSchema = new Schema({
    openId:{
        type:String,
        required:true
    },
    accessToken:{
        type:String,
        required:true
    },
    accessTokenCreateDate:{
        type:Date,
        required:true
    },
    refreshToken:{
        type:String,
        required:true
    },
    agentId:{
        type:String,
        ref:'agentId'
    }
})

module.exports = WxClient = mongoose.model('wxclient',WxClientSchema)