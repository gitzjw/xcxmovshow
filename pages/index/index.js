var app = getApp();
Page({
  data: {
    userInfo: null
  },
  mythreadNew:function(){
    wx.navigateTo({
      url:'../mythreadNew/mythreadNew'
    })
  },
  ver:function(){
     wx.navigateTo({
      url: '../logs/logs'
    })
  },
  user:function(e){
     var rd_session = this.data.userInfo.rd_session;
     wx.navigateTo({
      url: '../member/member?rd_session=' + rd_session
    })
  },
  addressList: function (e) {
    var rd_session = this.data.userInfo.rd_session;
    wx.navigateTo({
      url: '../addressList/index?rd_session=' + rd_session
    })
  },

  //刷新
  Refresh: function () {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          var code = res.code;
          wx.getUserInfo({
            success: function (res) {
              //发起网络请求
              var userInfo = res.userInfo;
              wx.request({
                url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=shop&m=onLogin',
                data: {
                  userInfo: userInfo,
                  code: code,
                },
                success: function (res) {
                  //console.log(res.data)
                  if (res.data.status == '200' && res.data.msg == 'success') {
                    userInfo.rd_session = res.data.rd_session;
                    userInfo.bbs_name = res.data.bbs_name;
                    userInfo.uc_avatarUrl = res.data.uc_avatarUrl
                    app.globalData.userInfo = userInfo;
                    that.setData({
                      userInfo: userInfo
                    })
                    wx.showToast({
                      title: '成功',
                      icon: 'success',
                      duration: 1000
                    })
                    wx.clearStorage()
                    wx.clearStorageSync()
                  } else {
                    wx.showModal({
                      title: '提示',
                      content: res.data.msg,
                      showCancel: true,

                    })
                  }
                }
              })
            }
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '获取用户登录态失败！',
            showCancel: true,

          })
        }
      }
    });
  },

  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo,
      });
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },

  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '乐宠社区商城', // 分享标题
      desc: '乐宠汇集社区浏览、商城服务于一体。让各位宠友快速便捷浏览在乐宠社区中的养宠心得；也可以上商城购物；', // 分享描述
      path: 'pages/home/home' // 分享路径
    }
  }
})