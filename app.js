
var util = require('./utils/util.js')
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
        typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
        //调用登录接口
        wx.login({
            success: function(res) {
                if (res.code) {
                    var code = res.code;
                    wx.getUserInfo({
                        success: function (res) {
                            //发起网络请求
                            var userInfo = res.userInfo;
                            that.globalData.userInfo = userInfo;
                            wx.request({
                              url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=shop&m=onLogin',
                              data: {
                                userInfo:userInfo, 
                                code : code,
                              },
                              success: function(res) {
                                if(res.data.status == '200' && res.data.msg == 'success'){
                                    userInfo.rd_session = res.data.rd_session;
                                    userInfo.bbs_name = res.data.bbs_name;
                                    userInfo.uc_avatarUrl = res.data.uc_avatarUrl;
                                    that.globalData.userInfo = userInfo;
                                    //wx.setStorageSync('rd_session', res.data.rd_session)
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
 
  globalData:{
    userInfo:null
  }
})