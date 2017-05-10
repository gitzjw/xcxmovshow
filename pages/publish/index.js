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
        fid: 4,
        name: '七嘴八舌'
      },
      {
        fid: 4,
        name: '七嘴八舌'
      },
    ],
    fid: 4,
    forumNew_name: "七嘴八舌",
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
    var aidlist = that.data.aidlist;
    var re_session = that.data.userInfo.re_session;
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
        this.formRequst(re_session, fid, allvalue, aidlist);
      }
    }
  },
  //表单请求
  formRequst: function (re_session, fid, allvalue, aidlist) {
    wx.request({
      url: 'https://xcxbbs.movshow.com/index.php/home/index/threadPost',
      data: {
        fid: fid,
        re_session: re_session,
        title:allvalue.title,
        content:allvalue.text,
        aidlist: aidlist,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
         //console.log(res); 
        if (res.data.status == true) {
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
      count: 4,
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
    var that = this;
    var fid = that.data.fid;
    wx.showToast({
      title: '上传中',
      icon: 'loading',
      duration: 1000
    })
    wx.uploadFile({
      url: 'https://xcxbbs.movshow.com/index.php/home/index/uploadthreadImage/re_session/'+re_session,
      filePath: filePaths[i],
      name: 'file',
      formData: {
        're_session': re_session,
      },
      success: (resp) => {
        var resp = JSON.parse(resp.data);//把字符串类型转换为JSON类型
        //console.log(resp);
        if (resp.status == true) {
          successUp++;
          if (aidlist) {
            aidlist = aidlist + "," + resp.data.aid
          } else {
            aidlist = resp.data.aid
          }
        } else{
          failUp++;
        }

      },
      fail: (res) => {
        //failUp++;
      },
      complete: (resp) => {
        var resp = JSON.parse(resp.data);//把字符串类型转换为JSON类型
        i++;
        //console.log(resp)
          if (i == length) {
            var msg = '总共' + successUp + '张上传成功,' + failUp + '张上传失败！';
            console.log(msg);
            that.setData({
              imgList: filePaths,
              aidlist: aidlist

            })
            //递归结束调用表单请求
            this.formRequst(re_session, fid, allvalue, aidlist);
          } else {  
            //递归调用uploadDIY函数
            this.uploadDIY(filePaths, successUp, failUp, i, length, aidlist, allvalue, re_session);
          }

      },
    });
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
        url: 'https://xcxbbs.movshow.com/index.php/home/index/forumPostList/', //接口地址
        data: {

        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.setData({
            forumNew: res.data.data
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