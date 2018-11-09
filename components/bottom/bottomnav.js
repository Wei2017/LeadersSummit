// components/bottom/bottomnav.js
import { HTTP } from '../../utils/http.js';
const http = new HTTP();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: String,
    // sign: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    sign: ""
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { 
      var that = this;
      http.request({
        url: "Smallwx/getEnrollInfo",
        data: {
          unionid: wx.getStorageSync('unionid')
        },
        success: res => {
          console.log(res)
          if (res.data.user_enroll_info.length == 0) {
            wx.setStorageSync('sign', "0");
          } else {
            wx.setStorageSync('sign', "1");
          }
          that.setData({
            sign: wx.getStorageSync('sign')
          })
          console.log(wx.getStorageSync('sign'))
        }
      })
      
    },
    hide: function () { },
    resize: function () { },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    gosign() {
      if (wx.getStorageSync('user_id') && wx.getStorageSync('user_id') != "") {
        wx.navigateTo({
          url: "/pages/signup/signup"
        })
      } else {
        wx.navigateTo({
          url: "/pages/author/author"
        })
      }
    },
    gohome() {
      if (this.data.num != 0) {
        wx.redirectTo({
          url: "/pages/home/home"
        })
      }
    },
    gopeople() {
      if (this.data.num != 1) {
        wx.redirectTo({
          url: "/pages/renmai_list/renmai_list"
        })
      }
    },
    godaka() {
      if (this.data.num != 2) {
        wx.redirectTo({
          url: "/pages/big_shot/big_shot"
        })
      }
    },
    gomine() {
      if (this.data.num != 3) {
        wx.redirectTo({
          url: "/pages/my/my"
        })
      }
    },
    gomenpiao() {
      wx.navigateTo({
        url: "/pages/mytickets/mytickets"
      })
    }

  }
})
