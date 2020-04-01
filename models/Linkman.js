const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LinkmanSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  tel:{
    type:String,
    required:true
  },
  wxId:{
    type:String
  },
  agentId:{
    type:String,
    required:true
  },
  managerId:{
    type:String,
    required:true
  },
  createDate:{
    type:Date,
    default:() => {
      return Date.now()
    }
  }
})

module.exports = Linkman = mongoose.model('linkman',LinkmanSchema)