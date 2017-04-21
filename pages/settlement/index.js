
var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
Page({
    data: {
        status: 0,
        allGoods: [],
        sumPrice: 0,
        userInfo: null,
        address: ''
    },
    onLoad: function (options) {
        var that = this;
        app.getUserInfo(function (userInfo) {
            that.setData({
                userInfo: userInfo,
            });
        })

        this.getDefaultAddress();

        // 1没有商品 2正常（从缓存里面拿商品信息） 3商品加入缓存失败
        var status = options.status;
        if (status == 2) {
            var allGoods = wx.getStorageSync('allGoods');
            var sumPrice = 0;
            for (var i = 0; i < allGoods.length; i++) {
                var price = allGoods[i].price;
                var count = allGoods[i].buycount;
                price = util.accMul(price, count);
                allGoods[i].pay = price;
                sumPrice = util.accAdd(sumPrice, price);
            }
            this.setData({ allGoods: allGoods, sumPrice: sumPrice });

        }


    },
    getDefaultAddress: function () {
        //获取地址
        var that = this;
        var rd_session = this.data.userInfo.rd_session;
        if (rd_session == null) {
            wx.showModal({
                title: '提示',
                content: '获取用户登录信息失败，请到个人中心点击刷新登录状态，重新操作',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定，后期用主动触刷新')
                    }
                }
            })
            that.setData({ status: res.data.status });
        } else {
            wx.request({
                url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=shop&m=address',
                data: {
                    re_session: rd_session,
                },
                success: function (res) {
                    if (res.data.status == 200) {
                        that.setData({ address: res.data.address });
                    } else {
                        that.setData({ status: res.data.status });
                        wx.showModal({
                            title: '提示',
                            content: '登录超过1小时，请到个人中心点击刷新登录状态，重新操作',
                            showCancel: false,
                            success: function (res) {
                                if (res.confirm) {
                                    console.log('用户点击确定，后期用主动触刷新')
                                }
                            }
                        })
                        // console.log(res.data.msg);
                    }
                }
            });
        }
    },
    address: function (e) {
        var consignee = e.currentTarget.dataset.consignee;
        var mobile = e.currentTarget.dataset.mobile;
        var address = e.currentTarget.dataset.address;
        wx.navigateTo({
            url: '../address/index?consignee=' + consignee + '&mobile=' + mobile + '&address=' + address
        })
    },

    toAddress: function () {
        wx.navigateTo({ url: '/pages/address/index' })
    },
    creatOrder: function (sumPrice, gid, number, rd_session, address, allGoods) {
        var data = {
            payPrice: 66,
            sumPrice: sumPrice,
            gid: gid,
            number: number,
            consignee: address.consignee,
            mobile: address.mobile,
            address: address.address,
            allGoods: allGoods
        };
        wx.request({
            url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=shop&m=createOrder',
            data: {
                re_session: rd_session,
                data: data
            },
            success: function (res) {
                console.log(res);
                if (res.data.status == 404) {
                    wx.showModal({
                        title: '提示',
                        showCancel: false,
                        content: res.data.msg,
                    })
                } else if (res.code == '200' && res.msg == 'success') {
                    //订单创建成功
                    typeof callback == "function" && callback(res.data)
                } else {
                    //订单创建失败
                    typeof callback == "function" && callback('')
                }
            }
            // http.httpGet("?c=order&a=createOrder" ,data,function(res){
            //     if(res.code == '200' && res.msg == 'success'){
            //         //订单创建成功
            //          typeof callback == "function" && callback(res.data)
            //     }else{
            //         //订单创建失败
            //          typeof callback == "function" && callback('')
            //     }  
        })
    },
    payOrderSuccess: function (orderid, status, callback) {
        var data = {
            appid: config.APPID, userid: this.data.userInfo.id,
            id: orderid,
            status: status
        };
        http.httpGet("?c=order&a=updateOrder", data, function (res) {
            if (res.code == '200' && res.msg == 'success') {
                //订单支付成功
                typeof callback == "function" && callback(res.data)
            } else {
                //订单支付失败
                typeof callback == "function" && callback('')
            }
        })
    },
    settlement: function () {
        wx.showModal({
            title: '尊敬的用户',
            content: '支付系统暂不能用，您可以下载乐宠APP或前往京东乐宠店进行购买！',
            success: function (res) {
                return;
            }
        })


        var that = this;
        //检查地址是否为空
        if (this.data.address == "") {
            wx.showModal({
                title: '提示',
                content: '请您先添加邮寄地址！',
                success: function (res) {
                    if (res.confirm) {
                        that.toAddress();
                    }
                    return;
                }
            })
        }
        //继续生成订单
        var rd_session = this.data.userInfo.rd_session;
        console.log(rd_session)
        var addressid = this.data.address.id;
        var allGoods = this.data.allGoods;
        var gid = '', number = '';
        allGoods.forEach(function (goods) {
            if (gid == '') {
                gid = goods.id;
                number = goods.buycount;
            } else {
                gid = gid + ',' + goods.id;
                number = number + ',' + goods.buycount;
            }
        })
        wx.showToast({
            title: '正在下单...',
            icon: 'loading',
            duration: 1000
        });
        this.creatOrder(this.data.sumPrice, gid, number, rd_session, this.data.address, allGoods)


        // this.creatOrder(this.data.sumPrice,gid,number,rd_session,
        //     function(orderid){
        //        if(orderid != ''){
        //             try{
        //                 wx.setStorageSync('shoppingcar','');
        //             }catch(e){
        //                 console.log('清空购物车失败');
        //             }
        //             console.log('下单成功，订单号为'+orderid)
        //             wx.redirectTo({url: '/pages/order/index'})

        //             /*wx.showToast({
        //                 title: '下单成功',
        //                 icon: 'success',
        //                 duration: 1000
        //             });*/
        //             //此处写支付

        //        }
        // });
    }
})
