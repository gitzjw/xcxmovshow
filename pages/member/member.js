//index.js 
//获取应用实例 
var tcity = require("citys.js");
var app = getApp()
Page({
    data: {
        userInfo: null,
        uc_avatarUrl: null,
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
    bindimg: function () {
        var that = this;
        var rd_session = that.data.rd_session;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=xcxChangePic',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    // header: {}, // 设置请求的 header
                    formData: {
                        re_session: rd_session
                    }, // HTTP 请求中其他额外的 form data
                    success: function (res) {
                        var res = JSON.parse(res.data);
                        //console.log(res)
                        if (res.status == 200) {
                            app.globalData.userInfo.uc_avatarUrl = res.pic;
                            that.setData({
                                uc_avatarUrl:res.pic
                            })
                            wx.showToast({
                                title: '成功',
                                icon: 'success',
                                duration: 1000
                            })
                        } else {
                            wx.showModal({
                                showCancel: true,
                                title: '提示',
                                content: res.msg,
                            })
                        }

                    },

                })
            }
        })
    },

    formSubmit: function (e) {
        var that = this;
        var username = e.detail.value.username;
        var rd_session = that.data.rd_session;
        var sex = that.data.sex;
        var province = that.data.province;
        var city = that.data.city;
        var county = that.data.county;
        if (!username) {
            wx.showModal({
                showCancel: true,
                title: '提示',
                content: "用戶名不能爲空",
            })
        } else {
            wx.request({
                url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=xcxUpdateuserinfodetail',
                data: {
                    re_session: rd_session,
                    sex: sex,
                    province: province,
                    city: city,
                    county: county,

                },
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function (res) {
                    if (res.data.status == 200) {
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
                fail: function () {
                    // fail
                },
                complete: function () {
                    // complete
                }
            })
        }
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
        var rd_session = e.rd_session;
        if (rd_session == null) {
            wx.showModal({
                title: '提示',
                content: "请到个人中心刷新登录",
            })
        } else {
            wx.request({
                url: 'https://lechongwu.cn/plugins/API.v1.0/?&a=bbs&m=getUserInfoByUid',
                data: {
                    re_session: rd_session,
                },
                success: function (res) {
                    if (res.data.status == 200) {
                        that.setData({
                            uc_avatarUrl: res.data.uc_avatarUrl,
                            username: res.data.username,
                            sex: res.data.sex,
                            rd_session: rd_session
                        });
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: res.data.msg,
                        })
                    }
                },
                complete: function (res) {
                    var proRes = res.data.province;
                    var citRes = res.data.city;
                    var couRes = res.data.area;
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
