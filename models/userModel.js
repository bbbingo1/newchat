const mongodb = require('mongoose');
mongodb.Promise = require('bluebird');

const userSchema = mongodb.Schema({
    id: mongodb.Schema.Types.ObjectId,
    password:String,
    account:String,
    age: {
        type:Number,
        min:0,
        max:100
    },
    mailbox: String,
    introduction:String,
    address:String
})

var user = mongodb.model('User',userSchema)
module.exports = user