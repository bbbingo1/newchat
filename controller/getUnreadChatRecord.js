//获取未读信息
const express = require('express')
const router = express.Router()
const messModel = require('../models/messModel')
const userModel = require('../models/userModel')

const checkLogin = require('../middlewares/check').checkLogin

router.get('/', checkLogin, function (req, res, next) {
  let userid = req.session.userid
  const wherestr = { 'receiver': userid, 'status': 'unread' };
  const opt = { "sender": 1, "receiver": 1, "content": 1, "date": 1,"_id": 0 };
  const opt2 = { 'status': 'read' }

  userModel.findOne({ _id: userid }, function (err, user) {
    userid = user._id;
    messModel.find(wherestr, opt, function (err, messages) {
      if (err) {
        console.log(err);
        res.json({ "result": "failed", "reason": "服务器出错" })
        return;
      }
      else {
        for (var i = 0; i < messages.length; i++) {
          messModel.update(wherestr, opt2, function (err, newmess) {
            if (err) {
              console.log(err);
              res.json({ "result": "failed", "reason": "服务器出错" })
              return;
            }
          })
        }
        // if (messages == "") {
        //   res.json({ "result": "success", "message": null })
        //   return;
        // }
        // else {
        //   res.json({ "result": "success", "message": messages })
        // }
        res.json(messages)
      }
    })
  })
})

module.exports = router