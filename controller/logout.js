//登出
const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

router.get('/', checkLogin, function (req, res, next) {
    req.session.userid = '';
    res.json({ "result": "success" });
})

module.exports = router