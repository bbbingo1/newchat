//获取聊天记录
const express = require('express');
const router = express.Router();
const messModel = require('../models/messModel');
const userModel = require('../models/userModel');

const checkLogin = require('../middlewares/check').checkLogin

router.get('/', checkLogin, function (req, res, next) {
  userModel.findOne({ _id: req.session.userid }, function (err, user) {
    const userid = user._id;
    const wherestr = { 'receiver': {$in:[req.query.id,userid]}, "sender": {$in:[req.query.id,userid]} }
    const opt = { "sender": 1, "receiver": 1, "content": 1, "date": 1, };
    messModel.find(wherestr, opt, function (err, messages) {
      if (err) {
        console.log(err);
        res.json({ "result": "failed", "reason": "服务器出错" })
        return;
      }
      else {
        res.json(messages)
      }
    })
  })

})

module.exports = router