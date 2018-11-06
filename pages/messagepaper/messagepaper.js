// pages/messagepaper/messagepaper.js
import { HTTP } from '../../utils/http.js';
const http = new HTTP();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    cont:"",  //留言内容
    contlength:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 监听input字数
  watchPassWord: function (event) {
    console.log(event)
    this.setData({
      num: event.detail.cursor,
      cont:event.detail.value
    })
  },
  // 提交留言
  sub: function (event) {
    var that = this;
    console.log(that.data.cont)
    if (that.data.cont != ""){
      http.request({
        url: "Smallwx/addComment",
        data: {
          user_id: "119152",
          answerBody: that.data.cont
        },
        success: res => {
          console.log(res)
          if(res.code == 1){
            wx.redirectTo({
              url: "/pages/message/message"
            })
          }
          
        }
      })
    }else{
      this.setData({
        contlength:0
      })
    }
    
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