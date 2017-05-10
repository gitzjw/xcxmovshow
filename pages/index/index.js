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
    var re_session = this.data.userInfo.re_session;
    wx.navigateTo({
      url: '../member/member?re_session=' + re_session
    })
  },
  //头像
  bindimg: function () {
    var that = this;
    var userInfo = that.data.userInfo;
    var re_session = userInfo.re_session;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://xcxbbs.movshow.com/index.php/home/index/uploadChangePic/re_session/' + re_session,
          filePath: tempFilePaths[0],
          name: 'file',
          // header: {}, // 设置请求的 header
          formData: {
          }, // HTTP 请求中其他额外的 form data
          success: function (res) {
            var res = JSON.parse(res.data);
            if (res.status == true) {
                userInfo.imageUrl=res.data.imageUrl;
                app.globalData.userInfo = userInfo;
                that.setData({
                    userInfo:userInfo
                })
                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 1000
                })
            } else {
                wx.showModal({
                    showCancel: true,
                    title: '提示',
                    content: res.msg,
                })
            }

          },

        })
      }
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
                url: 'https://xcxbbs.movshow.com/index.php/home/index/onLogin/',
                data: {
                  nickName: userInfo.nickName,
                  avatarUrl: userInfo.avatarUrl,
                  code: code,
                },
                success: function (res) {
                  if (res.data.status == true && res.data.code == 200) {
                    userInfo.username = res.data.data.username;
                    userInfo.imageUrl = res.data.data.imageUrl;
                    userInfo.re_session = res.data.data.re_session;
                    getApp().globalData.userInfo = userInfo;
                    that.setData({
                      userInfo: userInfo
                    })
                    wx.showToast({
                      title: '刷新成功',
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

  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '貓咪有約论坛', // 分享标题
      desc: '全面专业的科学养猫知识；爱心领养救助中心；倡导一旦选择终生负责、不抛弃不放弃的养宠理念；', // 分享描述
      path: 'pages/home/home' // 分享路径
    }
  }
})