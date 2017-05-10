

Page({
	data: {
		id: 0,
		pn: 0,
		showLoading: true,
		array: {},
		dataInfo: {},
		Top: {},
		windowHeight: 500,
		wt_img: 80,
		tb_img: 50,
		url: "",
		requireOnOff: true,
		ThreadListOnOff: true,
		ThreadTopListOnOff: true,

	},


	redirect: function (e) {
		var id = e.currentTarget.dataset.id;

		wx.navigateTo({
			url: '../detail/detail?id=' + id
		})
	},
	lower: function (e) {
		var that = this;
		var showLoading = that.data.showLoading;
		if (showLoading) {
			var id = that.data.id;
			var pn = that.data.pn + 1;
			var requireOnOff = that.data.requireOnOff;
			var threadShowLayerNew = 'https://xcxbbs.movshow.com/index.php/home/index/forumThreadList/fid/' + id + '/pn/' + pn;
			if (requireOnOff) {
				that.setData({
					requireOnOff: false,
				})
				wx.request({
					url: threadShowLayerNew, //接口地址
					data: {

					},
					header: {
						'content-type': 'application/json'
					},
					success: function (res) {

						if (res.data.status == true) {
							that.setData({
								array: that.data.array.concat(res.data.data),
								showLoading: true,
								pn: pn
							})
						} else {
							that.setData({
								showLoading: false,

							})
						}
					},
					complete: function () {
						that.setData({
							requireOnOff: true,
						})
					}
				})
			} 
		} else {
			console.log("同样请求未完成，不在请求");
		}
	},

	onLoad: function (options) {
		var that = this;
		var id = options.id;
		var ThreadListOnOff = that.data.ThreadListOnOff;
		var ThreadTopListOnOff = that.data.ThreadTopListOnOff;
		if (ThreadTopListOnOff) {
			that.setData({
				ThreadTopListOnOff: false
			})
			wx.request({
				url: 'https://xcxbbs.movshow.com/index.php/home/index/forumThreadTopList/fid/' + id,
				data: {

				},
				header: {
					'content-type': 'json'
				},
				success: function (res) {
					that.setData({
						id: id,
						Top: res.data.data.list,
						dataInfo: res.data.data.forumInfo,
						url: "http://upload.movshow.com/forum/XCX/" + id + ".jpg",
						ThreadTopListOnOff: true
					})
				}
			})
		} else {
			console.log("請求未完成，等待完成");
		}
		if (ThreadListOnOff) {
			that.setData({
				ThreadListOnOff: false
			})
			wx.request({
				url: "https://xcxbbs.movshow.com/index.php/home/index/forumThreadList/fid/" + id, //接口地址
				data: {

				},
				header: {
					'content-type': 'application/json'
				},
				success: function (res) {
					//console.log(res.data.data);
					that.setData({
						array: res.data.data
					})
				},
				complete: function () {
					that.setData({
						ThreadListOnOff: true,
					})
				}
			})
		} else {
			console.log("請求未完成，等待完成");
		}
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
