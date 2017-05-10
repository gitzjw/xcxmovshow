
var app = getApp();
Page({
	data: {
		pn: 0,
		list: [],
		listzz: [],
		hint: false,
		showLoading: true,
		lowerLoading: false,
		lowerhint: false,
		bannerUrls: [],
		indicatorDots: true,
		autoplay: true,
		interval: 5000,
		duration: 1000,
		userInfo: null,
		wt_img: 80,
		tb_img: 50,
		dellStyle: "modList",
		//初始化TOUCHSTART坐标
		startpoint: [0, 0]


	},
	bindtap: function (e) {
		var that = this;
		var id = e.currentTarget.dataset.id;
		var key = e.currentTarget.dataset.key;
		var listzz = that.data.listzz;
		var re_session = that.data.userInfo.re_session;
		//触摸时间距离页面打开的毫秒数  
		var touchTime = that.data.touch_end - that.data.touch_start
		// console.log(touchTime)
		//如果按下时间大于350为长按  
		if (touchTime > 350) {
			wx.showModal({
				title: '温馨提示',
				content: '删除帖子操作，点击确认则删除，取消则不删除，请谨慎操作',
				success: function (res) {
					if (res.confirm) {
						wx.request({
							url: 'https://xcxbbs.movshow.com/index.php/home/index/delthread',
							data: {
								tid:id,
								re_session: re_session
							},
							header: {
								'content-type': 'json'
							},
							success: function (res) {
								//console.log(res.data)
								if (res.data.status == true) {
									listzz.splice(key, 1);
									that.setData({
										listzz: listzz
									})
								}
							}
						})
					}
				}
			})
		} else {
			wx.navigateTo({
				url: '../detail/detail?id=' + id
			})
		}
	},
	//按下事件开始  
	mytouchstart: function (e) {
		let that = this;
		that.setData({
			touch_start: e.timeStamp
		})
		console.log(e.timeStamp + '- touch-start')
	},
	//按下事件结束  
	mytouchend: function (e) {
		let that = this;
		that.setData({
			touch_end: e.timeStamp
		})
		console.log(e.timeStamp + '- touch-end')
	},

	dell: function () {
		Console.log("dddddd")
		this.setData({
			dellStyle: "margin-left:-50px"
		})
	},
	onShareAppMessage: function () {
		return {
			title: '我的帖子',
			path: 'pages/home/home'
		}
	},
	redirect: function (e) {
		var id = e.currentTarget.dataset.id;

		wx.navigateTo({
			url: '../detail/detail?id=' + id
		})
	},
	scrolltolower: function (e) {
		if (!this.data.showMore) return;
		this.loadData(this.data.pn);
	},
	loadData: function (pn) {
		var that = this;
		var re_session = that.data.userInfo.re_session;
		var mythreadNew = 'https://xcxbbs.movshow.com/index.php/home/index/mythreadNew';
		if (pn > 0) {
			that.setData({
				lowerLoading: true,
			})
		}

		wx.request({
			url: mythreadNew,
			data: {
				pn: pn,
				re_session: re_session
			},
			header: {
				'content-type': 'json'
			},
			success: function (res) {
				if (pn == 0) {
					if (res.data.status == true) {
						that.setData({
							listzz: that.data.listzz.concat(res.data.data),
							showLoading: false,
							pn: pn + 1
						})
					} else {
						that.setData({
							showLoading: false,
							hint: true
						})
					}
				} else {
					if (res.data.status == true) {
						that.setData({
							listzz: that.data.listzz.concat(res.data.data),
							lowerLoading: false,
							pn: pn + 1
						})
					} else {
						that.setData({
							lowerLoading: false,
							lowerhint: true

						})
					}
				}

			}

		})
	},
	onLoad: function (options) {
		var that = this
		app.getUserInfo(function (userInfo) {
			that.setData({
				userInfo: userInfo,
			});
		})
		this.loadData(this.data.pn)
	},
	onReady: function () {

	},
	onShow: function () {
		var that = this
		wx.getSystemInfo({
			success: function (res) {
				var tb_img = res.windowWidth * 0.15;
				var wt_img = res.windowWidth * 0.25;
				that.setData({
					wt_img: wt_img,
					tb_img: tb_img,
					postHeight: res.screenHeight
				});

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