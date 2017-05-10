//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
    img:'http://uc.chinapet.com/avatar.php?uid=1457243&size=middle'

  },
  onLoad: function () {
    var that =this;
    	wx.getSystemInfo({
				success: function (res) {
					that.setData({
						Width: res.windowWidth,
            height:res.windowHeight
					})

				}
			})
  }
})
