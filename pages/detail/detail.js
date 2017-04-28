


Page({
	data: {
		requireOnOff: true,
		id: null,
		pn: 0,
		myrecommend: false,
		windowWidth: 400,
		windowHeight: 400,
		scroll: true,
		userInfo: null,
		value: null,
		live: "../../image/live.png",
		bq: "../../image/bq.png",
		threadinfo: {},
		postarray: {},
		postHeight: 200,
		posttotal: 0,
		recommendarray: {},
		recommend_add: 0,
		showLoading: true,
		showClearBtn: false

	},

	// //赞
	// praisePost: function (e) {
	// 	var that = this;
	// 	if (that.data.myrecommend) {
	// 		var iscancel = 1;//取消
	// 	} else {
	// 		var iscancel = 0;//点赞
	// 	}
	// 	var tid = that.data.threadinfo.tid;
	// 	var re_session = that.data.userInfo.rd_session;
	// 	wx.request({
	// 		url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=praisePost',
	// 		data: {
	// 			tid: tid,
	// 			iscancel: iscancel,
	// 			re_session: re_session
	// 		},
	// 		method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
	// 		// header: {}, // 设置请求的 header
	// 		success: function (res) {
	// 			var recommend_add = parseInt(that.data.recommend_add);
	// 			if (res.data.status == 200) {
	// 				wx.showToast({
	// 					title: '成功',
	// 					icon: 'success',
	// 					duration: 1000
	// 				})
	// 				recommend_add += 1
	// 				that.setData({
	// 					recommend_add: recommend_add,
	// 					myrecommend: true,
	// 				})
	// 			} else if (res.data.status == 201) {
	// 				wx.showToast({
	// 					title: '成功',
	// 					icon: 'success',
	// 					duration: 1000

	// 				})
	// 				that.setData({
	// 					recommend_add: recommend_add - 1,
	// 					myrecommend: false,
	// 				})
	// 			} else {
	// 				wx.showModal({
	// 					title: '提示',
	// 					content: res.data.msg,
	// 				})
	// 			}
	// 		},
	// 	})

	// },
	//输入时监控
	bindinput: function (event) {
		var that = this;
		var value = event.detail.value;
		if (value == "" || value == undefined || value == null) {
			that.setData({
				showClearBtn: false
			})
		} else {
			that.setData({
				showClearBtn: true
			})
		}
	},


	// formSubmit: function (e) {
	// 	var that = this;
	// 	var content = e.detail.value.content;
	// 	var rd_session = that.data.userInfo.rd_session;
	// 	var tid = that.data.threadinfo.tid;
	// 	if (content) {
	// 		wx.request({
	// 			url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=postReplyNew',
	// 			data: {
	// 				tid: tid,
	// 				content: content,
	// 				re_session: rd_session,
	// 				platform: 'iPhone8',
	// 				version: 'd1bd83a33f1a841ab7fda32449746cc4'
	// 			},
	// 			method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
	// 			// header: {}, // 设置请求的 header
	// 			success: function (res) {
	// 				console.log(res)
	// 				if (res.data.status == 200) {
	// 					that.setData({
	// 						value: null,
	// 						showClearBtn: false
	// 					}),
	// 						wx.showToast({
	// 							title: '成功',
	// 							icon: 'success',
	// 							duration: 1000
	// 						})
	// 				} else {
	// 					wx.showModal({
	// 						title: '提示',
	// 						content: '回复失败',
	// 					})
	// 				}
	// 			},

	// 		})
	// 	} else {
	// 		wx.showModal({
	// 			title: '提示',
	// 			content: '回复内容不能为空',
	// 			success: function (res) {
	// 				that.setData({
	// 					value: null,
	// 					showClearBtn: false
	// 				})
	// 			}
	// 		})
	// 	}
	// },
	lower: function (e) {
		var that = this;
		var requireOnOff = that.data.requireOnOff;
		var showLoading = that.data.showLoading;
		var tid = that.data.threadinfo.tid;
		var pn = that.data.pn + 1;
		var threadShowLayerNew = 'https://xcxbbs.movshow.com/index.php/home/index/threadShowList/tid/' + tid + '/pn/' + pn;
		if (showLoading) {
			if (requireOnOff) {//请求开关防止多次重复请求
				that.setData({
					requireOnOff: false,
				})
				wx.request({
					url: threadShowLayerNew,
					data: {

					},
					header: {
						'content-type': 'application/json'
					},
					success: function (res) {
						if (res.data.status == 'true') {
							that.setData({
								postarray: that.data.postarray.concat(res.data.data),
								showLoading: true,
								pn: pn
							})
						} else {
							that.setData({
								showLoading: false,
							})
						}
					},
					fail: function () {
						that.setData({
							showLoading: false,
						})
					},
					complete: function () {
						that.setData({
							requireOnOff: true,
						})
					}
				})
			}else{
				console.log("相同请求未结束，不必再查询");
			}
		} else {
			console.log("已经没有内容，不必再查询");
		}
	},
	onLoad: function (options) {
		//帖子主体信息
		var that = this;
		var id = options.id;
		var myrecommend = false;
		//var rd_session = that.data.userInfo.rd_session;
		var URL_threadDetailNew = 'https://xcxbbs.movshow.com/index.php/home/index/postInfo/tid/' + id + '/user_id/28569';
		wx.request({
			url: URL_threadDetailNew,
			data: {
				//	re_session: rd_session
			},
			header: {
				'content-type': 'application/json'
			},
			success: function (res) {
				if (res.data.status == "false") {
					wx.showModal({
						title: '温馨提示',
						showCancel: false,
						content: res.data.msg,
						success: function (res) {
							wx.navigateBack({
								delta: 1
							})
						}
					})
				} else {
					that.setData({
						threadinfo: res.data.data,
						posttotal: res.data.data.posttotal,
						recommendarray: res.data.data.recommendarray,
						recommend_add: res.data.data.recommend_add
					})
				}
			},
			fail: function () {
				wx.showModal({
					title: '温馨提示',
					showCancel: false,
					content: "接口调用失败，获取失败！",
					success: function (res) {
						wx.navigateBack({
							delta: 1
						})
					}
				})
			}
		}),
		//回复列表
		wx.request({
			url: "https://xcxbbs.movshow.com/index.php/home/index/threadShowList/tid/" + id + "/pn/0",
			data: {
				//	re_session: rd_session
			},
			header: {
				'content-type': 'application/json'
			},
			success: function (res) {
			//console.log(res.data.data);
				if (res.data.status == "false") {
					that.setData({
						showLoading: false,
						postarray: res.data.data,
					})
				} else {
					if(res.data.data.length < 10 ){
						var Loading = false;
					}else{
						var Loading = true;
					}
					that.setData({
						showLoading:Loading,
						postarray:res.data.data,
					})
				
				}
			}
		})
		//获取用户信息	
		getApp().getUserInfo(function (userInfo) {
			that.setData({
				userInfo: userInfo,
			});
		})

	},
	onReady: function () {

	},
	onShow: function () {
		var that = this;
		wx.getSystemInfo({
			success: function (res) {
				var windowWidth = res.windowWidth - 30;
				var postHeight = (res.windowHeight) / 1.5;
				that.setData({
					windowWidth: windowWidth,
					windowHeight: res.windowHeight,
					postHeight: postHeight
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