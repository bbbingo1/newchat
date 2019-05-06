//获取好友列表
const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')


const checkLogin = require('../middlewares/check').checkLogin

router.post('/', checkLogin, function (req, res, next) {
  const userId = req.session.userid

  userModel.find({},function(err,users){
    if(err){
      console.log(err);
      res.json({"result":"failed","reason":"服务器出错"})
    }
    else{
      for(let i = 0;i <users.length;i++)
        if(users[i]._id == userId){
          //除去用户本身以外的用户列表
          users.splice(i,1);
          break;
        }
        const lists = users.map(function(user){
          return{
            nickname: user.account,
            id:user._id
          }
        })
        res.json(lists)
    }
  })
})

module.exports = router