import {CardDetails} from '../../models/card.js';
const cardDetails = new CardDetails();
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardState: '6' //1-6
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //设置头部背景颜色和字体颜色
    util.setnavBarBjColor();
    //动态设置当前页面标题
    wx.setNavigationBarTitle({
      title: '当前页面'
    });

    cardDetails.getCardDetails(options.bid,options.uid,res=>{
      console.log(res);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  jumpSq:function(){
    let state = false;
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo']){
          wx.navigateTo({
            url: '/pages/author/author',
          })
        }
      }
    })
  }
})