//登录接口
const express = require('express')
const router = express.Router()
const sha1 = require('sha1')
const userModel = require('../models/userModel')
const checkNotLogin = require('../middlewares/check').checkNotLogin

router.post('/', checkNotLogin, function (req, res, next) {
  const account = req.body.account
  let password = req.body.password

  //检验参数
  try {
    if (account == '' || password == '') {
      throw new Error('字段不能为空！')
    }
    if (/[\u4e00-\u9fa5]+/.test(account)) {
      throw new Error('账号不能为中文！')
    }
  }
  catch (e) {
    res.json({ "result": "failed", "reason": e.message })
    return;
  }

  userModel.findOne({ account: account }, function (err, user) {
    if (err) {
      console.log(err)
      res.json({ "result": "failed", "reason": "服务器错误" })
      return;
    }
    if (!user) {
      res.json({
        "result": "failed",
        "reason": "账号不存在"
      })
      return;
    }
    if (user.password != password) {
      res.json({
        "result": "failed",
        "reason": "账号或密码错误"
      })
      return;
    }
    //登录成功
    else {
      req.session.userid = user._id;
      res.json({ "result": "success", "userid": user._id })
      return;
    }
  })


})

module.exports = router