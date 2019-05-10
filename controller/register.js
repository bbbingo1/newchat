//注册
const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')
const checkNotLogin = require('../middlewares/check').checkNotLogin

router.post('/', checkNotLogin, function (req, res, next) {
  console.log(req)
  const account = req.body.account
  let password = req.body.password

  // 校验参数
  try {
    if (account == '' || password == '') {
      throw new Error('字段不能为空！')
    }
    // if (/[\u4e00-\u9fa5]+/.test(account)) {
    //   throw new Error('账号不能为中文！')
    // }

  } catch (e) {
    res.json({"result": "failed", "reason": e.message});
    return;
  }
  userModel.find({account:account},function(err,users){
    //数据库数据异常:
    if(err){
      // console.log(err)
      res.json({"result": "failed", "reason": "服务器出错！"});
      return;
    }
    if(users.length != 0){ 
      res.json({"result": "failed", "reason": "账号已存在！"});
      return;
    }
    else{
      //注册成功
      const userenity = new userModel({
        account:account,
        password:password
      })
      userenity.save(err=>{
        if(err){
          // console.log(err)
          res.json({
            "result":"failed",
            "reason":"服务器出错！"
          })
          return;
        }
        else{
          res.json({"result":"success"})
          return;
        }
      })
    }
  })


})

module.exports = router