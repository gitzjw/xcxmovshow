


Page({
	data: {
		id: null,
		pn: 0,
		myrecommend: false,
		windowWidth: 400,
		scroll: true,
		userInfo: null,
		value: null,
		live: "../../image/live.png",
		bq: "../../image/bq.png",
		threadinfo: {},
		postarray: {},
		postarrayLength: 0,
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
	// //输入时监控
	// bindinput: function (event) {
	// 	var that = this;
	// 	var value = event.detail.value;
	// 	if (value == "" || value == undefined || value == null) {
	// 		that.setData({
	// 			showClearBtn: false
	// 		})
	// 	} else {
	// 		that.setData({
	// 			showClearBtn: true
	// 		})
	// 	}
	// },


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
		var posttotal = that.data.posttotal;
		// if (posttotal > 9) {
		var tid = that.data.threadinfo.tid;
		var pn = that.data.pn + 1;
		var threadShowLayerNew = 'https://xcxbbs.movshow.com/index.php/home/index/threadShowList/tid/' + tid + '/user_id/' + user_id + '/pn/' + pn;

		wx.request({
			url: threadShowLayerNew,
			data: {

			},
			header: {
				'content-type': 'application/json'
			},
			success: function (res) {
				//console.log(res.data)
				var postarrayLength = res.data.postarray.length;
				if (res.data.postarray.length > 0) {
					that.setData({
						postarray: that.data.postarray.concat(res.data.postarray),
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
		// } else {
		// 	that.setData({
		// 		showLoading: false,

		// 	})
		// }
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
		})


		// getApp().getUserInfo(function (userInfo) {
		// 	that.setData({
		// 		userInfo: userInfo,
		// 		id: id
		// 	});
		// })

	},
	onReady: function () {

	},
	onShow: function () {
		var that = this;
		// var id = that.data.id;
		// console.log(id);
		// var myrecommend = false;
		// //var rd_session = that.data.userInfo.rd_session;
		// var URL_threadDetailNew = 'https://xcxbbs.movshow.com/index.php/home/index/postInfo/tid/' + id;
		// wx.request({
		// 	url: URL_threadDetailNew, //接口地址
		// 	data: {
		// 	//	re_session: rd_session
		// 	},
		// 	header: {
		// 		'content-type': 'application/json'
		// 	},
		// 	success: function (res) {
		// 		console.log(res.data);
		// 		if (!res.data.status) {
		// 			wx.showModal({
		// 				title: '提示',
		// 				content: res.data.msg,
		// 			})
		// 		}
		// 		if (res.data.result == 0) {
		// 			if (res.data.threadinfo.myrecommend == 0) {
		// 				var myrecommend = false
		// 			} else {
		// 				var myrecommend = true
		// 			}
		// 		}

		// 		that.setData({
		// 			myrecommend: myrecommend,
		// 			threadinfo: res.data.threadinfo,
		// 			recommendarray: res.data.recommendarray,
		// 			recommend_add: res.data.threadinfo.recommend_add
		// 		})
		// 	}
		// }),
		// wx.request({
		// 	url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=threadShowLayerNew&tid=' + id + '&pn=' + 1,
		// 	data: {},
		// 	method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
		// 	// header: {}, // 设置请求的 header
		// 	success: function (res) {
		// 		var postarrayLength = res.data.postarray.length;
		// 		if (res.data.posttotal < 11) {
		// 			var showLoading = false;
		// 			var scroll = false;
		// 			var postHeight = postarrayLength * 85;
		// 		} else {
		// 			var showLoading = true;
		// 			var scroll = true;
		// 			var postHeight = 450;
		// 		}

		// 		if (postarrayLength > 0) {
		// 			that.setData({
		// 				scroll: scroll,
		// 				showLoading: showLoading,
		// 				postHeight: postHeight,
		// 				postarrayLength: postarrayLength,
		// 				postarray: res.data.postarray,
		// 				posttotal: res.data.posttotal
		// 			})
		// 		} else {
		// 			that.setData({
		// 				scroll: scroll,
		// 				showLoading: showLoading,
		// 				postHeight: postHeight
		// 			})
		// 		}
		// 	},

		// }),

		wx.getSystemInfo({
			success: function (res) {
				var windowWidth = res.windowWidth - 30;
				that.setData({
					windowWidth: windowWidth
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