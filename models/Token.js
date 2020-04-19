const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const TokenSchema = new Schema({
    type:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    expires_in:{
        type:Number,
        required:true 
    },
    createTime:{
        type:Date,
        default:()=>{return Date.now()}
    }
})

module.exports = Token = mongoose.model('token',TokenSchema)