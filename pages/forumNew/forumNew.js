

Page({
	data:{
		list:{},
		// 页面配置  
		winWidth: 0, 
		winHeight: 1400, 
		// tab切换 
		currentTab: 0,
	},
	
  //携带参数跳转
  forumList:function(e){
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url:'../forumList/forumList?id='+id
    })
  },
	// 滑动切换tab 
 	bindChange: function( e ) { 
	  var that = this; 
    if(e.detail.current == 0){
        var hg = 1400;
      }
      if(e.detail.current == 1){
        var hg = 500;
      }
      if(e.detail.current == 2){
        var hg =1800;
      }
	  that.setData( { currentTab: e.detail.current,winHeight: hg  }); 
	}, 
	
	 // 点击tab切换 
 	swichNav: function( e ) { 
	  var that = this; 
	  if( this.data.currentTab === e.target.dataset.current ) { 
	   return false; 
	  }else{ 
      if(e.target.dataset.current == 0){
        var hg = 1400;
      }
      if(e.target.dataset.current == 1){
        var hg = 500;
      }
      if(e.target.dataset.current == 2){
        var hg =1800;
      }
	   that.setData( { 
	    currentTab: e.target.dataset.current ,
      winHeight: hg 
	   }) 
	  } 
	 },
	onLoad:function(options){
		var that = this;
		var id = options.id;
		
		var URL_threadDetailNew = 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=indexforumNew';
		wx.request({
		  url: URL_threadDetailNew, //接口地址
		  data: {
		     
		  },
		  header: {
		      'content-type': 'application/json'
		  },
		  success: function(res) {
		    //console.log(res.data);
		    that.setData({
				list:res.data
			})
		  }
		}),

    // 获取系统信息 
    wx.getSystemInfo( { 
     success: function( res ) { 
      that.setData( { 
       winWidth: res.windowWidth, 
      
      }); 
     } 
    }); 

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
