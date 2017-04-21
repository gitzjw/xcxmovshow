
var api =require('../../utils/api.js');

Page({
	data:{
		dataInfo:[],
		array:[]
	},


	onLoad:function(options){
		var that = this;
		var id = options.id;
		
		var URL_actDetailByTageId = 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=actDetailByTageId&id='+id;
		wx.request({
		  url: URL_actDetailByTageId, //接口地址
		  data: {
		  
		  },
		  header: {
		      'content-type': 'application/json'
		  },
		  success: function(res) {
		    //console.log(res.data);
		    that.setData({
						dataInfo:res.data.dataInfo,
						array:res.data.array
					})
		  }
		})
	},
	redirect:function(e){
		var id = e.currentTarget.dataset.id;

		wx.navigateTo({
			url:'../detail/detail?id='+id
		})
	},
	modalTap: function(e) {
    wx.showModal({
	      title: "完整版体验",
	      content: "1、乐宠APP ①应用商城搜索  ②前往APP下载页 www.weibaquan.com   ; 2、登录 宠物中国社区 www.chinapet.com" ,
	      showCancel: false,
	      confirmText: "确定"
	    })
	  },

	onReady:function(){
		
	},
	onShow:function(){
		
	},
	onHide:function(){
		
	},
	onUnload:function(){
		
	},
	onPullDownRefresh:function(){
		
	},
	onReachBottom:function(){
		
	}
})		