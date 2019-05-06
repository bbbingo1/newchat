const mongodb = require('mongoose')
mongodb.Promise = require('bluebird')

const messSchema = mongodb.Schema({
    id: mongodb.Schema.Types.ObjectId,
    sender: String,//发送者的id
    receiver: String,//接受者id
    date: Date,//发送日期
    content: String,//内容
    status: { type: String, default: 'unread' }//消息状态，默认未读
})

const mess = mongodb.model('message', messSchema)
module.exports = mess