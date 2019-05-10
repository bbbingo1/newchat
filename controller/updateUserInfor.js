//修改个人信息
const express = require('express')
const router = express.Router()
const mongodb = require('mongoose');
mongodb.Promise = require('bluebird');
const userModel = require('../models/userModel');
const checkLogin = require('../middlewares/check').checkLogin

router.post('/', checkLogin, function (req, res, next) {
  const account = req.body.account;
  const age = req.body.age;
  const address = req.body.address
  const introduction = req.body.introduction
  const mailbox = req.body.mailbox

  //检验参数
  try {
    if (age == '' || mailbox == '' || introduction == '' || address == '' || account == '') {
      throw new Error('字段不能为空！')
    }
    // if (/[\u4e00-\u9fa5]+/.test(account)) {
    //   throw new Error('账号不能为中文！')
    // }
    if (age < 0 || age > 100) {
      throw new Error('年龄超出范围')
    }
  }
  catch (e) {
    res.json({ "result": "failed", "reason": e.message })
    return;
  }
  let newInfo = {
    mailbox: mailbox,
    age: age,
    introduction: introduction,
    address: address,
    account: account
  }
  console.log(newInfo)
  userModel.update({ _id: req.session.userid }, newInfo,
    function (err) {
      if (err) {
        console.log(err);
        res.json({ "result": "failed", "reason": "服务器出错！" });
        return;
      }
      res.json({ "result": "success" });
    });
})

module.exports = router