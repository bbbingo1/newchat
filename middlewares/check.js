//权限控制
module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.userid) {
      return res.json({ "result": "failed", "reason": "请先登录！" })

    }
    next()
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.userid) {
      console.log(req.session)
      return res.json({ "result": "failed", "reason": "已登录" })
    }
    next()
  }
}