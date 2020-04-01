const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CarSchema = new Schema({
  carno:{
    type:String,
    required:true
  },
  managerId:{
    type:String,
    required:true
  },
  agentId:{
    type:String,
    require:true
  },
  type:{
    type:Number,
    required:true
  },
  checkDate:{
    type:Date,
    required:true,
    default:()=>{return Date.now()}
  },
  createDate:{
    type:Date,
    default:()=>{return Date.now()}
  },
  linkmans:[{linkmanId:String}]
})

module.exports = Car = mongoose.model('cars',CarSchema)