const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AgentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    default: 1
  },
  tel: {
    type: String,
    required: true
  },
  agentId: {
    type: String,
    default: '1'
  },
  status: {
    type: Number,
    required: true,
    default: 1
  },
  expireDate: {
    type: Date,
    default: ()=>{return Date.now()}
  },
  createDate: {
    type: Date,
    default: ()=>{return Date.now()}
  }
})

module.exports = Agent = mongoose.model('agents', AgentSchema)
