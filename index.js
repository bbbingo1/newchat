const path = require('path')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session)
const config = require('config-lite')(__dirname)
const routes = require('./routes')
const pkg = require('./package')
//数据库引入
const mongodb = require('mongoose');
mongodb.Promise = require('bluebird');
mongodb.connect(config.mongodb);
//连接成功
mongodb.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + config.mongodb)
})

//连接失败
mongodb.connection.on('error', function (err) {
    console.log('Mongoose connection err' + err)
});

//连接断开
mongodb.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

const app = express()

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))
// session 中间件
app.use(session({
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
        url: config.mongodb// mongodb 地址
    })
}))
app.use(bodyParser.urlencoded({ extended: false }));//返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。好像没什么影响
//设置允许跨域请求
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", null);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Access-Control-Allow-Credentials", "true"); //是否支持cookie跨域
    next();
});

// //处理表单及文件上传的中间件
// app.use(require('express-formidable')({
//     uploadDir: path.join(__dirname, 'public/img'),//上传文件目录
//     keepExtensions: true //保留后缀
// }))

// //设置模板全局常量
// app.locals.blog = {
//     title: pkg.name,
//     description: pkg.description
// }

// 路由
routes(app)

// 监听端口，启动程序
app.listen(config.port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`)
})
//supervisor index 启动程序
//node index 启动程序