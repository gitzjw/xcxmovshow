var app = getApp();
Page({
	data: {
		requireOnOff: true,
		pn: 0,
		list: [],
		listzz: [],
		showMore: true,
		showLoading: true,
		bannerUrls: [],
		indicatorDots: true,
		autoplay: true,
		interval: 5000,
		duration: 1000,
		userInfo: null,
		wt_img: 80,
		tb_img: 50,


	},
	onShareAppMessage: function () {
		return {
			title: '猫咪有约',
			path: 'pages/home/home'
		}
	},
	redirect: function (e) {
		var id = e.currentTarget.dataset.id;

		wx.navigateTo({
			url: '../detail/detail?id=' + id
		})
	},
	publish: function () {
		wx.navigateTo({
			url: '../publish/index'
		})
	},
	forumNew: function(e){
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url:'../forumList/forumList?id='+id
    })
  },
	redirectActivity: function (e) {
		var id = e.currentTarget.dataset.id;

		wx.navigateTo({
			url: '../activity/activity?id=' + id
		})
	},
	binderrorimg: function (e) {
		var that = this;
		var listzz = that.data.listzz;
		var errorImgIndex = e.target.dataset.errorimg //获取循环的下标
		var errorImgPic = e.target.dataset.errorpic //获取pics下标
		listzz[errorImgIndex]['pics'][errorImgPic] = "../../image/jzsb.png";
		that.setData({
			listzz: listzz,
		})
	},
	scrolltolower: function (e) {
		if (!this.data.showMore) return;
		this.loadData(this.data.pn);
	},
	loadData: function (pn) {
		var that = this;
		var requireOnOff = that.data.requireOnOff;
		var URL_threadIntroduceForIndexV4 = 'https://xcxbbs.movshow.com/index.php/home/index/digestList/pn/' + pn;
		if (requireOnOff) {
			that.setData({
				requireOnOff: false
			})
			wx.request({
				url: URL_threadIntroduceForIndexV4,
				data: {

				},
				header: {
					'content-type': 'json'
				},
				success: function (res) {

					if (res.data.status) {
						that.setData({
							listzz: that.data.listzz.concat(res.data.data),
							showLoading: false,
							pn: pn + 1
						})
					} else {
						that.setData({
							showMore: false
						})
					}
					//console.log(res.data)
				},
				complete: function () {
					that.setData({
						requireOnOff: true,
					})
				}
			})
		} else {
			console.log("請求未完成，不在重複");
		}
	},
	onLoad: function (options) {
		var that = this
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
				});

			}
		}),
		wx.request({
			url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=indexbanner',
			data: {

			},
			header: {
				'content-type': 'json'
			},
			success: function (res) {
				that.setData({
					bannerUrls: res.data.array,
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