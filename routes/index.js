var path = require('path')

module.exports = function (app) {
  //页面请求
  app.get('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
  })
  //登录状态相关接口
  app.use('/register', require('../controller/register'))//注册，暂未启用
  app.use('/login', require('../controller/login'))//登录
  app.use('/logout', require('../controller/logout'))//登出
  //用户信息相关接口
  app.use('/updateUserInfor', require('../controller/updateUserInfor'))//修改用户信息
  app.use('/getUserInfor', require('../controller/getUserInfor'))//获取用户信息
  //好友相关接口
  app.use('/getList', require('../controller/getList'))//获取好友列表
  // app.use('/setRemark', require('../controller/setRemark'))//修改好友备注名，弃用
  //消息相关接口
  app.use('/sendContent', require('../controller/sendContent'))//发送消息
  app.use('/getUnreadChatRecord', require('../controller/getUnreadChatRecord'))//获取未读消息
  app.use('/getChatRecord', require('../controller/getchatRecord'))//获取与某位好友的聊天记录

  // 404 page
  // app.use(function (req, res) {
  //   if (!res.headersSent) {
  //     res.status(404).render('404')
  //   }
  // })
}