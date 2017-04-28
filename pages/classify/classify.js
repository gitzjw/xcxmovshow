
//获取应用实例
Page({
  data: {
    classesPic: [
      {
        "fid": "18",
        "name": "流浪动物领养中心",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "4",
        "name": "七嘴八舌",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "14",
        "name": "猫物推荐",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "5",
        "name": "流浪救助信息",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "20",
        "name": "养猫新手上路",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "16",
        "name": "养猫攻略分享",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "25",
        "name": "跳蚤市场",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "119",
        "name": "医生会诊交流区",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "231",
        "name": "北京领养日",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "154",
        "name": "义卖专区",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "116",
        "name": "济南猫窝",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "60",
        "name": "上海猫友会",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "29",
        "name": "天津猫友会",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "111",
        "name": "武汉分站",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "147",
        "name": "太原分站",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "155",
        "name": "粤来粤爱猫",
        "picurl": "../../image/2.jpg"
      },

      {
        "fid": "56",
        "name": "猫友贴图",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "34",
        "name": "生活大杂烩",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "24",
        "name": "猫狗一家亲",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "146",
        "name": "有约活动专区",
        "picurl": "../../image/2.jpg"
      },
      {
        "fid": "11",
        "name": "站务办公室",
        "picurl": "../../image/2.jpg"
      }
    ]
  },
  forumList:function(e){
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url:'../forumList/forumList?id='+id
    })
  },
  onLoad: function (options) {
  
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
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})