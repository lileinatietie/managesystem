const express = require('express')
const app = express()
const http = require('http')
const fs = require('fs')
const mongoose = require('mongoose');

mongoose.connect('mongodb://172.21.2.236:27017/190110910119');
// var db=mongoose.createConnection('mongodb://localhost/wuhu');
const schema = {
    uname: String,
    upwd : String,
    
}
const mydata = mongoose.model('login1', schema);

const schema_n = {
  sname: String,
  sno : String,
  sdor :String,
  date : Date,
  grade : String,
  
}
const stugrade = mongoose.model('grade', schema_n);

const schema_r = {
    sname: String,
    sno : String,
    sdor :String,
    rdate : Date,
    rps : String,
    
  }
const sturepair = mongoose.model('repair', schema_r);

const schema_m = {
  manname: String,
  manpwd : String,
  
}
const man = mongoose.model('manager', schema_m);

app.use('/',express.static('public'))
app.listen(10119)