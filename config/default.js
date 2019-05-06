module.exports = {
  port: 3000,
  session: {
    key: 'newchat',
    secret:'rdc_newchat',
    maxAge:2592000000
  },
  mongodb: 'mongodb://localhost:27017/newchat'
}