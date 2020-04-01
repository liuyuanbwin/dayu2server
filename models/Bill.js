const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BillSchema = new Schema({
  carId:{
    type:String,
    required:true,
    ref:'cars'
  },
  type:{
    type:Number,
    required:true
  },
  companyId:{
    type:String,
    required:true,
    ref:'insurancecompany'
  },
  price:{
    type:Number,
    required:true
  },
  linkmanId:{
    type:String,
    required:true,
    ref:'linkman'
  },
  remark:{
    type:String
  },
  createDate:{
    type:Date,
    default:()=>{return Date.now()}
  },
  expireDate:{
    type:Date,
    required:true
  },
  managerId:{
    type:String,
    required:true
  },
  agentId:{
    type:String,
    required:true
  },
})

module.exports = Bill = mongoose.model('bill',BillSchema)