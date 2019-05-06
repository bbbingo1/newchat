//获取用户信息
const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')
const checkLogin = require('../middlewares/check').checkLogin

router.get('/', checkLogin, function (req, res, next) {
  const userId = req.query.id
  if (userId == '') {
    res.json({ "result": "failed", "reason": "用户字段不能为空" });
    return;
  }
  userModel.findOne({ _id: userId }, function (err, user) {
    if (err) {
      console.log(err);
      res.json({ "result": "failed", "reason": "服务器出错！" });
      return;
    }
    if (!user) {
      res.json({ "result": "failed", "reason": "该用户不存在！" });
      return;
    }
    else {
      res.json({ "address": user.address, "mailbox": user.mailbox, "introduction": user.introduction, "nickname": user.account, "age": user.age });
    }
  })
})

module.exports = router