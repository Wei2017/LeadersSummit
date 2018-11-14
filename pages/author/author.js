import {HTTP} from '../../utils/http.js';
const http = new HTTP;
const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //用户已经授权过
              wx.navigateTo({
                url: '/pages/home/home',
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      wx.setStorageSync('user_info', e.detail.userInfo)
      let iv = e.detail.iv,
          encryptedData = e.detail.encryptedData;
      //用户按了允许授权按钮
      var that = this;
      //请求接口获取user_id存入缓存
      http.request({
        url: 'Smallwx/checkRegisterInfo',
        data: {
          iv: iv,
          openid: app.globalData.data.openid,
          session_key: app.globalData.data.session_key,
          encryptedData: encryptedData
        },
        success: res => {
          wx.setStorageSync('user_id', res.user_id);
          //授权成功后，跳转进入小程序首页
          wx.navigateBack({
            delta: 1
          })
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
   
  },

})