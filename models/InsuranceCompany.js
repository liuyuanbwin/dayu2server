const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InsuranceCompanySchema = new Schema({
  name:{
    type:String,
    required:true
  },
  servicetel:{
    type:String,
    required:true
  },
  agentId:{
    type:String,
    required:true
  }
})

module.exports = InsuranceCompany = mongoose.model('insurancecompany',InsuranceCompanySchema)