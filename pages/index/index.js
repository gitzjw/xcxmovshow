var app = getApp();
Page({
  data: {
    userInfo: null
  },
  mythreadNew: function () {
    wx.navigateTo({
      url: '../mythreadNew/mythreadNew'
    })
  },
  ver: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  user: function (e) {
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
              that.globalData.userInfo = userInfo;
              wx.request({
                url: 'https://xcxbbs.movshow.com/index.php/home/index/onLogin/',
                data: {
                  nickName: userInfo.nickName,
                  avatarUrl: userInfo.avatarUrl,
                  code: code,
                },
                success: function (res) {
                  if (res.data.status == 'true' && res.data.code == '200') {
                    //userInfo.rd_session = res.data.rd_session;
                    userInfo.username = res.data.data.username;
                    userInfo.imageUrl = res.data.data.imageUrl
                    app.globalData.userInfo = userInfo;
                    that.setData({
                      userInfo: userInfo
                    })
                    wx.showToast({
                      title: '登录刷新成功',
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
      title: '貓咪有約论坛', // 分享标题
      desc: '全面专业的科学养猫知识；爱心领养救助中心；倡导一旦选择终生负责、不抛弃不放弃的养宠理念；', // 分享描述
      path: 'pages/home/home' // 分享路径
    }
  }
})