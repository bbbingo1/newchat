url = 'http://127.0.0.1:3000';//http://47.106.74.100
$.ajaxSetup({ xhrFields: { withCredentials: true }, crossDomain: true });
window.onload = function () {
  $("#register").click(register);
  $("#login").click(login);
  $("#logout").click(logout);
  $("#send").click(sendContent);
  $("#read").click(getUnreadChatRecord);
  $("#update").click(updateUserInfor);
  $("#check").click(getUserInfor);
  $("#getChatRecord").click(getChatRecord);
  $("#getList").click(getList);
}

//注册请求
function register() {
  $.ajax({
    url: url + "/register", //请求的url地址
    dataType: "json", //返回格式为json
    async: true,
    data: {
      account: $("#account1").val(),
      password: $("#password1").val(),
    },
    type: "POST",
    success: function (req) {
      var obj = eval("(" + JSON.stringify(req) + ")");
      if (obj.result == "success")
        alert("注册成功");
      else
        alert(obj.reason);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

//登录请求
function login() {
  $.ajax({
    url: url + "/login", //请求的url地址
    dataType: "json", //返回格式为json
    async: true,
    data: {
      account: $("#account").val(),
      password: $("#password").val()
    },
    type: "POST",
    success: function (req) {
      var obj = eval("(" + JSON.stringify(req) + ")");
      if (obj.result == "success") {
        console.log(obj);
        alert("登录成功");
      }
      else
        alert(obj.reason);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

//退出
function logout() {
  $.ajax({
    url: url + "/logout", //请求的url地址
    dataType: "json", //返回格式为json
    async: true,
    data: {},
    type: "GET",
    success: function (req) {
      var obj = eval("(" + JSON.stringify(req) + ")");
      if (obj.result == "success")
        alert("退出成功");
      else
        alert(obj.reason);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

//获取好友列表
function getList() {
  $.ajax({
    url: url + "/getList", //请求的url地址
    dataType: "json", //返回格式为json
    async: true,
    data: {},
    type: "POST",
    success: function (req) {
      var obj = eval("(" + JSON.stringify(req) + ")");
      if (!obj.result) {
        console.log(obj);
        alert("获取成功！请在控制台查看");
      }
      else
        alert(obj.reason);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

//发送消息
function sendContent() {
  $.ajax({
    url: url + "/sendContent", //请求的url地址
    dataType: "json", //返回格式为json
    async: true,
    data: {
      receiver: $("#receiver").val(),
      content: $("#content").val()
    },
    type: "POST",
    success: function (req) {
      var obj = eval("(" + JSON.stringify(req) + ")");
      if (obj.result == "success")
        alert("发送成功");
      else
        alert(obj.reason);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

//接收消息
function getUnreadChatRecord() {
  $.ajax({
    url: url + "/getUnreadChatRecord", //请求的url地址
    dataType: "json", //返回格式为json
    async: true,
    data: {},
    type: "GET",
    success: function (req) {
      var obj = eval("(" + JSON.stringify(req) + ")");
      if (obj.result) {
        alert(obj.reason);
      }
      else if (obj.length == 0) {
        alert("暂无新消息");
      }
      else {
        alert("接收到" + obj.length + "条新消息,请在控制台查看");
        console.log(obj);
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
}

//修改信息
function updateUserInfor() {
  $.ajax({
    url: url + "/updateUserInfor", //请求的url地址
    dataType: "json", //返回格式为json
    async: true,
    data: {
      age: $('#age').val(),
      introduction: $('#introduction').val(),
      address: $('#address').val(),
      mailbox: $('#mailbox').val(),
      account: $('#nickname').val()
    },
    type: "POST",
    success: function (req) {
      var obj = eval("(" + JSON.stringify(req) + ")");
      if (obj.result == 'success') {
        alert("修改成功！");
      }
      else
        alert(obj.reason);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

//查看用户信息
function getUserInfor() {
  $.ajax({
    url: url + "/getUserInfor", //请求的url地址
    dataType: "json", //返回格式为json
    async: true,
    data: {
      id: $('#account2').val()
    },
    type: "GET",
    success: function (req) {
      var obj = eval("(" + JSON.stringify(req) + ")");
      if (!obj.result) {
        alert("获取成功！请在控制台查看");
        console.log(obj);
      }
      else
        alert(obj.reason);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

//获取聊天记录
function getChatRecord() {
  $.ajax({
    url: url + "/getChatRecord", //请求的url地址
    dataType: "json", //返回格式为json
    async: true,
    data: {
      id: $('#account3').val()
    },
    type: "GET",
    success: function (req) {
      var obj = eval("(" + JSON.stringify(req) + ")");
      if (!obj.result) {
        alert("获取成功！请在控制台查看");
        console.log(obj);
      }
      else
        alert(obj.reason);
    },
    error: function (err) {
      console.log(err);
    }
  });
}