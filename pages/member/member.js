//index.js 
//获取应用实例 
var tcity = require("citys.js");
var app = getApp()
Page({
    data: {
        userInfo: null,
        username: null,
        sexArray: ['保密', '男', '女'],
        sex: null,
        provinces: [],
        province: "",
        citys: [],
        city: "",
        countys: [],
        county: '',
        value: [0, 0, 0],
        values: [0, 0, 0],
        condition: false

    },

    formSubmit: function (e) {
        var that = this;
        var username = e.detail.value.username;
        var re_session = that.data.re_session;
        var sex = that.data.sex;
        var province = that.data.province;
        var city = that.data.city;
        var county = that.data.county;
        wx.request({
            url: 'https://xcxbbs.movshow.com/index.php/home/index/Updateuserinfo',
            data: {
                re_session: re_session,
                sex: sex,
                province: province,
                city: city,
                county: county,

            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                if (res.data.status == true) {
                    wx.showModal({
                        showCancel: true,
                        title: '提示',
                        content: res.data.msg,
                    })
                } else {
                    wx.showModal({
                        showCancel: true,
                        title: '提示',
                        content: res.data.msg,
                    })
                }
            },
        
        })

    },
    sexChange: function (e) {
        var sex = e.detail.value;
        this.setData({
            sex: sex
        })
    },

    bindChange: function (e) {
        //console.log(e);
        var val = e.detail.value
        var t = this.data.values;
        var cityData = this.data.cityData;

        if (val[0] != t[0]) {
            console.log('province no ');
            const citys = [];
            const countys = [];

            for (let i = 0; i < cityData[val[0]].sub.length; i++) {
                citys.push(cityData[val[0]].sub[i].name)
            }
            for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
                countys.push(cityData[val[0]].sub[0].sub[i].name)
            }

            this.setData({
                province: this.data.provinces[val[0]],
                city: cityData[val[0]].sub[0].name,
                citys: citys,
                county: cityData[val[0]].sub[0].sub[0].name,
                countys: countys,
                values: val,
                value: [val[0], 0, 0]
            })

            return;
        }
        if (val[1] != t[1]) {
            console.log('city no');
            const countys = [];

            for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
                countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
            }

            this.setData({
                city: this.data.citys[val[1]],
                county: cityData[val[0]].sub[val[1]].sub[0].name,
                countys: countys,
                values: val,
                value: [val[0], val[1], 0]
            })
            return;
        }
        if (val[2] != t[2]) {
            console.log('county no');
            this.setData({
                county: this.data.countys[val[2]],
                values: val
            })
            return;
        }


    },
    open: function () {
        this.setData({
            condition: !this.data.condition
        })
    },
    onLoad: function (e) {
        var that = this;
        var re_session = e.re_session;
        if (re_session == null) {
            wx.showModal({
                title: '提示',
                content: "请到个人中心刷新登录",
            })
        } else {
            wx.request({
                url: 'https://xcxbbs.movshow.com/index.php/home/index/getUserInfo/re_session/' + re_session,
                data: {

                },
                success: function (res) {
                    //console.log(res.data);
                    if (res.data.status == true) {
                        that.setData({
                            sex: res.data.data.sex,
                            uc_avatarUrl: res.data.data.imageUrl,
                            re_session: re_session
                        });
                    } else {
                        wx.showModal({
                            title: '提示',
                            content:  res.data.msg,
                            success: function (res) {
							wx.navigateBack({
								delta: 1
							})
						}
                        })
                    }
                },
                complete: function (res) {
                    var proRes = res.data.data.province;
                    var citRes = res.data.data.city;
                    var couRes = res.data.data.area;
                    //地区列表设置
                    tcity.init(that);
                    var cityData = that.data.cityData;
                    const provinces = [];
                    const citys = [];
                    const countys = [];
                    var proNum = 0;
                    var citNum = 0;
                    var couNum = 0;
                    for (let i = 0; i < cityData.length; i++) {
                        provinces.push(cityData[i].name);
                        if (cityData[i].name == proRes) {
                            var proNum = i;
                        }
                    }
                    // console.log('省份完成');
                    for (let i = 0; i < cityData[proNum].sub.length; i++) {
                        citys.push(cityData[proNum].sub[i].name)
                        if (cityData[proNum].sub[i].name == citRes) {
                            var citNum = i;
                        }
                    }
                    // console.log('city完成');
                    for (let i = 0; i < cityData[proNum].sub[citNum].sub.length; i++) {
                        countys.push(cityData[proNum].sub[citNum].sub[i].name)
                        if (cityData[proNum].sub[citNum].sub[i].name == couRes) {
                            var couNum = i;
                        }
                    }
                    // console.log(cityData);
                    that.setData({
                        'provinces': provinces,
                        'citys': citys,
                        'countys': countys,
                        'province': cityData[proNum].name,
                        'city': cityData[proNum].sub[citNum].name,
                        'county': cityData[proNum].sub[citNum].sub[couNum].name
                    })

                }
            });
        }

    },


}) 
