const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  managerId:{
    type:String,
    required:true,
    ref:'agents'
  },
  agentId:{
    type:String,
    required:true
  },
  linkmanId:{
    type:String,
    required:true,
    ref:'linkman'
  },
  content:{
type:String,
required:true
  },              
  carId:{
    type:String,
    required:true,
    ref:'cars'
  },
  createDate:{
    type:Date,
    default:()=>{return Date.now()}
  }
})

module.exports = Reivew = mongoose.model('review',ReviewSchema)