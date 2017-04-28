
var util = require('./utils/util.js')
App({
  // onLaunch: function () {
  //   //调用API从本地缓存中获取数据
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)
  // },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
            var code = res.code;
            wx.getUserInfo({
              success: function (res) {
                //发起网络请求
                var userInfo = res.userInfo;
                wx.request({
                  url: 'https://xcxbbs.movshow.com/index.php/home/index/onLogin/',
                  data: {
                    nickName: userInfo.nickName,
                    avatarUrl: userInfo.avatarUrl,
                    code: code,
                  },
                  success: function (res) {
                    //console.log(res.data)
                    if (res.data.status == "true") {
                      userInfo.username = res.data.data.username;
                      userInfo.imageUrl = res.data.data.imageUrl
                      getApp().globalData.userInfo = userInfo;
                      typeof cb == "function" && cb(userInfo)
                    }
                  }
                })
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg + res.data.msg)
          }
        }
      });
    }
  },

  globalData: {
    userInfo: null
  }
})