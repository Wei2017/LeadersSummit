import {
  CardDetails
} from '../../models/card.js';
const cardDetails = new CardDetails();
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardState: '3', //1-6
    cardInfo: null,
    remaiList: [] //为您推荐列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    //设置头部背景颜色和字体颜色
    util.setnavBarBjColor();
    //动态设置当前页面标题
    wx.setNavigationBarTitle({
      title: '当前页面'
    });
    console.log(options);
    cardDetails.getCardDetails(options.bid, options.uid, res => {
      console.log(res);
      that.setData({
        cardInfo: res.data
      })
    });

    //获取人脉列表
    let data = {
      uid: wx.getStorageSync('user_id')
    }
    if (that.data.cardState == '3') {
      cardDetails.getHumanVeinList(data, res => {
        let data = res.data;
        let newArr = [];

        //如果推荐中存在正在访问的名片 则不推荐
        for (let i = 0; i < data.length; i++) {
          if (data[i].uid != options.bid){
            newArr.push(data[i])
          }
        }
        that.setData({
          remaiList: newArr
        })
      })
    }
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

  jumpSq: function() {
    let state = false;
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/author/author',
          })
        }
      }
    })
  }
})