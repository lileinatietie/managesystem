const express = require('express')
const ejs = require('ejs')
const app = express()
const http = require('http')
const fs = require('fs')
const {Console} = require('console')
const mongoose = require('mongoose');
var router = express.Router();
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

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false }))
app.use('/',express.static('public'))


app.get('/LoginAction', function (req, res, next) {
    username=req.query.username
    password=req.query.password
    userid = req.query.userid
   
 

      if(userid=="manager"){
        man.find({manname:username},(err, data)=>{
          if(data.length!=0){
            if(data[0].manname==username&&data[0].manpwd==password){
              ejs.renderFile('./public/index_m.html', {mname:username},  function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err){console.log("File is not error.")}
                else{
                  res.statusCode=200
                  res.setHeader('Content-type', 'text/html');
                  res.end(str);
                
                }
              });
            }else{
              ejs.renderFile('./public/index.html', {result:'1'},  function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err){console.log("File is not error.")}
                else{
                  res.statusCode=200
                  res.setHeader('Content-type', 'text/html');
                  res.end(str);
                
                }
              });
            }

          }else{
            ejs.renderFile('./public/index.html', {result:'1'},  function(err, str){
              // str => 输出渲染后的 HTML 字符串
              if(err){console.log("File is not error.")}
              else{
                res.statusCode=200
                res.setHeader('Content-type', 'text/html');
                res.end(str);
              
              }
            });
          }
        })

         
        
      }
         else{
          mydata.find({uname:username},(err, data)=>{
            if(data.length!=0){
              if(data[0].uname==username&&data[0].upwd==password){
                ejs.renderFile('./public/index_s.html', {sname: username},  function(err, str){
                  // str => 输出渲染后的 HTML 字符串
                  if(err){console.log("File is not error.")}
                  else{
                    res.statusCode=200
                    res.setHeader('Content-type', 'text/html');
                    res.end(str);
                  
                  }
                });
              }else{
                ejs.renderFile('./public/index.html', {result:'1'},  function(err, str){
                  // str => 输出渲染后的 HTML 字符串
                  if(err){console.log("File is not error.")}
                  else{
                    res.statusCode=200
                    res.setHeader('Content-type', 'text/html');
                    res.end(str);
                  
                  }
                });
              }

            }else{
              ejs.renderFile('./public/index.html', {result:'1'},  function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err){console.log("File is not error.")}
                else{
                  res.statusCode=200
                  res.setHeader('Content-type', 'text/html');
                  res.end(str);
                
                }
              });
            }
          })
         
        }

    
        
    // next()
  })

  app.get("/ReginAction", (req, res)=>{
    // res.send(req.query)
    // console.log(req.query)
    const stuRg = new mydata({ uname: req.query.username, upwd: req.query.password});
    stuRg.save()

    // ejs.renderFile(filename, data, options, function(err, str){
    //     //str => 输出渲染的HTML字符串
    // })   {result:cal.add_ab(dataA,dataB)}
    
    ejs.renderFile("login.html", { }, function(err,str){
        res.send(str)
    });
})

  



app.listen(10119)