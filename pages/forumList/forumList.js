

Page({
	data: {
		id: 0,
		pn: 1,
		showLoading: true,
		array: {},
		dataInfo: {},
		Top: {},
		windowHeight: 500,
		wt_img: 80,
		tb_img: 50,

	},


	redirect: function (e) {
		var id = e.currentTarget.dataset.id;

		wx.navigateTo({
			url: '../detail/detail?id=' + id
		})
	},
	lower: function (e) {
		var that = this;
		var showLoading =that.data.showLoading;
		if (showLoading) {
			var id = that.data.id;
			var pn = that.data.pn + 1;
			var threadShowLayerNew = 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=actDetailByTageIdV4&id=' + id + '&pn=' + pn;

			wx.request({
				url: threadShowLayerNew, //接口地址
				data: {

				},
				header: {
					'content-type': 'application/json'
				},
				success: function (res) {
					console.log(res.data)
					if ( res.data.array.length > 0) {
						that.setData({
							dataInfo: res.data.dataInfo,
					        array: that.data.array.concat(res.data.array),
							showLoading: true,
							pn: pn
						})
					} else {
						that.setData({
							showLoading: false,

						})
					}
				}
			})
		} else {
			that.setData({
				showLoading: false,

			})
		}
	},

	onLoad: function (options) {
		var that = this;
		var id = options.id;
		wx.request({
			url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=forumThreadTopList&id=' + id,
			data: {

			},
			header: {
				'content-type': 'json'
			},
			success: function (res) {
				that.setData({
					id: id,
					Top: res.data.response,

				})
			}
		})


		var URL_threadDetailNew = 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=actDetailByTageIdV4&id=' + id;
		wx.request({
			url: URL_threadDetailNew, //接口地址
			data: {

			},
			header: {
				'content-type': 'application/json'
			},
			success: function (res) {
				//console.log(res.data);
				that.setData({
					dataInfo: res.data.dataInfo,
					array: res.data.array
				})
			}
		})
	},
	onReady: function () {

	},
	onShow: function () {
		var that = this;
		wx.getSystemInfo({
			success: function (res) {
				var tb_img = res.windowWidth * 0.15;
				var wt_img = res.windowWidth * 0.25;
				that.setData({
					windowHeight: res.windowHeight,
					wt_img: wt_img,
					tb_img: tb_img,
				})


			}
		})

	},
	onHide: function () {

	},
	onUnload: function () {

	},
	onPullDownRefresh: function () {

	},
	onReachBottom: function () {

	}
})		
