//发送信息
const express = require('express')
const router = express.Router()
const messModel = require('../models/messModel')
const userModel = require('../models/userModel')

const checkLogin = require('../middlewares/check').checkLogin

router.post('/', checkLogin, function (req, res, next) {
  const receiver = req.body.receiver
  let content = req.body.content
  let sender = req.session.userid
  if (receiver == '' || content == '') {
    res.json({ "result": "failed", "reason": "字段不能为空！" });
    return;
  }
  userModel.findOne({ _id: receiver }, function (err, user) {
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
      //发送成功
      userModel.findOne({ _id: sender }, function (err, user) {
        sender = user._id;
        const date = new Date();
        const messentity = new messModel({
          sender: sender,
          receiver: receiver,
          content: content,
          date: date,
        }).save(function (err) {
          if (err) {
            console.log(err);
            res.json({ "result": "failed", "reason": "服务器出错！" })
            return;
          }
        });
        res.json({ "result": "success" })
      })
    }
  })
})

module.exports = router