// pages/signup/signup.js
import { HTTP } from '../../utils/http.js';
const http = new HTTP();
const app = getApp();
const phonegi = /^1[0-9]{10}$/;
const isemail = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/g;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    position: ['请选择', 'HRM', 'CEO', 'COO', 'CTO', 'CFO'],
    positionIndex: 0,
    positionChecked: '', //用户选中的职位的值
    title: "",//标题
    price: "",//价格
    meeting_id: "",
    trade_no: "",//流水号
    coupon: "",//优惠码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    http.request({
      url: "Smallwx/getEnrollInfo",
      data: {
        unionid: wx.getStorageSync('unionid')
      },
      success: res => {
        console.log(res)
        if (res.status == 1) {
          that.setData({
            title: res.data.info[0].meeting_name,
            price: res.data.info[0].price,
            meeting_id: res.data.info[0].meeting_id,
            trade_no: res.data.sn
          })
        }
      }
    })
  },
  // 职位选择
  bindPositionChange: function (e) {
    console.log('职位', this.data.position[e.detail.value])
    this.setData({
      positionIndex: e.detail.value
    })
  },
  // 报名提交
  formSubmit: function (e) {
    console.log(e.detail)
    const datas = e.detail.value;
    datas.form_id = e.detail.formId;
    datas.coupon = this.data.coupon;
    datas.nickname = app.globalData.userInfo.nickName; //昵称
    datas.user_pic = app.globalData.userInfo.avatarUrl; //头像
    datas.openid = app.globalData.data.openid;
    datas.unionid = wx.getStorageSync('unionid');
    console.log(datas);
    if (e.detail.value.truename == "") {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else if (e.detail.value.company == "") {
      wx.showToast({
        title: '公司不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else if (e.detail.value.job == "" || e.detail.value.job == "请选择") {
      wx.showToast({
        title: '职位不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else if (e.detail.value.company_mobile == "") {
      wx.showToast({
        title: '电话不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else if (e.detail.value.mobile == "") {
      wx.showToast({
        title: '手机不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else if (!phonegi.test(e.detail.value.mobile)) {
      wx.showToast({
        title: '手机格式有误',
        icon: 'loading',
        duration: 1500
      })
    } else if (e.detail.value.email == "") {
      wx.showToast({
        title: '邮箱不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else if (!isemail.test(e.detail.value.email)) {
      wx.showToast({
        title: '邮箱格式有误',
        icon: 'loading',
        duration: 1500
      })
    } else {
      var that = this;
      http.request({
        url: "Smallwx/enrollMeeting",
        data: datas,
        success: res => {
          console.log(res)
          if (res.code == 1) {
            http.request({
              url: "Smallwx/unifiedOrder3",
              data: {
                openid: app.globalData.data.openid,
                out_trade_no: that.data.trade_no,
                coupon: that.data.coupon,
                meeting_id: that.data.meeting_id

              },
              success: res => {
                console.log(res)
                wx.requestPayment({
                  'timeStamp': res.timeStamp,
                  'nonceStr': res.nonceStr,
                  'package': res.package,
                  'signType': res.signType,
                  'paySign': res.paySign,
                  success: function (res1) {
                    console.log(res1)
                    wx.redirectTo({
                      url: '/pages/mytickets/mytickets'
                    });
                  }
                })
              }
            })
          }
        }
      })

    }


  },
  // 优惠卷兑换
  changepaper: function (e) {
    var that = this;
    if (that.data.coupon != "") {
      http.request({
        url: "Smallwx/checkCouponValid",
        data: {
          meeting_id: that.data.meeting_id,
          coupon: that.data.coupon
        },
        success: res => {
          console.log(res)
          if (res.data.valid == 0 || res.data.valid == 2) {
            wx.showToast({
              title: '优惠卷不可用',
              icon: 'loading',
              duration: 1500
            })
          } if (res.data.valid == 1) {
            wx.showToast({
              title: '兑换成功',
              duration: 1500
            })
            that.setData({
              price: res.data.use_coupon_price
            })
          } if (res.data.valid == 3) {
            wx.showToast({
              title: '优惠卷已用完',
              icon: 'loading',
              duration: 1500
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '兑换码不得为空!',
        icon: 'loading',
        duration: 1500
      })
    }

  },
  // 优惠卷
  watchPlace: function (e) {
    this.setData({
      coupon: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})