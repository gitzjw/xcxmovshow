var app = getApp();
Page({
  data: {
    imgRes: 0,
    userInfo: [],
    imgList: 0,
    aidlist: 0,
    video: 0,
    videoid: 0,
    videoSrc: 0,
    wt_img: 50,
    tb_img: 80,
    forumNew: [
      {
        fid: 496,
        name: '汪星圈'
      },
      {
        fid: 568,
        name: '喵星圈'
      },
    ],
    fid: 496,
    forumNew_name: "汪星圈",
  },
  bindPickerChange: function (e) {
    var forumNew = this.data.forumNew;
    var id = e.detail.value;
    this.setData({
      fid: forumNew[id].fid,
      forumNew_name: forumNew[id].name
    })
  },
  formSubmit: function (e) {
    var that = this;
    var fid = that.data.fid;
    var allvalue = e.detail.value;
    // var aidlist = that.data.aidlist;
    var videoidlist = that.data.videoid;
    var re_session = that.data.userInfo.rd_session;
    if (!allvalue.title || !allvalue.text) {
      wx.showModal({
        title: '提示',
        content: "请填写标题和内容",
        showCancel: false,
      })
    } else {
      //判断图片，确认触发表单上传
      var imgRes = that.data.imgRes;
      if (imgRes) {
        var aidlist = '';
        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = imgRes.tempFilePaths.length; //总共个数
        var i = 0; //第几个
        this.uploadDIY(imgRes.tempFilePaths, successUp, failUp, i, length, aidlist, allvalue, re_session);
      } else {
        this.formRequst(re_session, fid, allvalue, aidlist, videoidlist);
      }
    }
  },
  //表单请求
  formRequst: function (re_session, fid, allvalue, aidlist, videoidlist) {
    wx.request({
      url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=threadPostNew&re_session=' + re_session + '&fid=' + fid,
      data: {
        data: allvalue,
        aidlist: aidlist,
        videoidlist: videoidlist
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.status == 200) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000,
            success() {
              wx.redirectTo({
                url: '../forumList/forumList?id=' + fid
              })
            }
          })
        } else {
          wx.showModal({
            title: '失败',
            content: res.data.msg,
          })
        }
      }
    })
  },

  //图片选择
  chooseImgs: function (e) {
    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        that.setData({
          imgRes: res,
          imgList: res.tempFilePaths,
        })
      },
    });
  },
  //图片上传
  uploadDIY(filePaths, successUp, failUp, i, length, aidlist, allvalue, re_session) {
    console.log(re_session)
    var that = this;
    var fid = that.data.fid;
    var videoidlist = that.data.videoid;
    wx.showToast({
      title: '上传中',
      icon: 'loading',
      duration: 1000
    })
    wx.uploadFile({
      url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=bbsUpdate',
      filePath: filePaths[i],
      name: 'file',
      formData: {
        're_session': re_session,
      },
      success: (resp) => {
        var resp = JSON.parse(resp.data);//把字符串类型转换为JSON类型
        if (resp.status == 200) {
          successUp++;
          if (aidlist) {
            aidlist = aidlist + "," + resp.aid
          } else {
            aidlist = resp.aid
          }
        } else if (resp.status == 301) {
          failUp++;
        }

      },
      fail: (res) => {
        //failUp++;
      },
      complete: (resp) => {
        var resp = JSON.parse(resp.data);//把字符串类型转换为JSON类型
        i++;
        if (resp.status == 404) {
          wx.showModal({
            title: '提示',
            content: resp.msg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {

              }
            }
          })
        } else {
          if (i == length) {
            that.setData({
              imgList: filePaths,
              aidlist: aidlist

            })
            //递归结束调用表单请求
            this.formRequst(re_session, fid, allvalue, aidlist, videoidlist);
            // wx.showModal({
            //   title: '提示',
            //   content: '总共' + successUp + '张上传成功,' + failUp + '张上传失败！',
            //   showCancel: false,
            //   success: function (res) {
            //     if (res.confirm) {
            //       console.log('用户点击确定')

            //     }
            //   }
            // })
          }
          else {  //递归调用uploadDIY函数
            this.uploadDIY(filePaths, successUp, failUp, i, length, aidlist, allvalue, re_session);
          }
        }
      },
    });
  },
  //视频，暂时不用
  chooseVideo: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['camera'], // album 从相册选视频，camera 使用相机拍摄
      maxDuration: 10, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
      camera: ['front', 'back'],
      success: function (res) {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 4000
        })
        wx.uploadFile({
          url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=bbsUpdateVideo',
          filePath: res.tempFilePath,
          name: 'file',
          formData: {
            're_session': that.data.userInfo.rd_session,
          },
          success: function (res) {
            var data = JSON.parse(res.data);
            //console.log(data)
            if (data.status == 200) {
              //刷新登录re_session
              that.setData({
                videoid: data.videoid,
                videoSrc: data.url,
                video: 1
              })
            } else {
              wx.showModal({
                title: '提示',
                content: data.msg,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    // console.log('用户点击确定，后期改为主动触发刷新')
                  }
                }
              })
            }

          }
        })

      },
    })
  },

  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this
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
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        var tb_img = res.windowWidth * 0.15;
        var wt_img = res.windowWidth * 0.25;
        that.setData({
          wt_img: wt_img,
          tb_img: tb_img,
        });

      }
    }),

      wx.request({
        url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=fornumNewList', //接口地址
        data: {

        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          // console.log(res.data);
          that.setData({
            forumNew: res.data
          })
        }
      })

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
})