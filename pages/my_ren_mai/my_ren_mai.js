import {
  CardDetails
} from '../../models/card.js';
const cardDetails = new CardDetails();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: '1', //1我的人脉 2待我审核 3对方审核
    isWs: '', //完善名片状态
    renmaiList: [],
    user_id: '',
    searchVal:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      isWs: options.isWs,
      user_id: wx.getStorageSync('user_id')
    })
  },

  //我的名片
  toCard: function(e) {
    let that = this;
    let wsState = that.data.isWs; //0,1
    let user_id = wx.getStorageSync('user_id')
    // 如果用户未授权则跳转授权页面
    if (!user_id) {
      wx.navigateTo({
        url: '/pages/author/author',
      })
    } else if (wsState == '0') { //如果用户未完善名片信息
      wx.navigateTo({
        url: '/pages/edit_info/edit_info',
      })
    } else {
      wx.navigateTo({
        url: '/pages/my_card/my_card?state=1',
      })
    }
  },
  //点击待我审核
  waitMy: function(e) {
    let that = this;
    wx.navigateTo({
      url: '/pages/wait_my/wait_my?user_id=' + that.data.user_id,
    })
  },
  //点击对方审核
  waitYou: function(e) {
    let that = this;
    wx.navigateTo({
      url: '/pages/wait_you/wait_you?user_id=' + that.data.user_id,
    })
  },
  //跳转人脉详情
  toDetail: function(e) {
    let id = e.detail.id;
    let name = e.detail.name;
    wx.navigateTo({
      url: `/pages/my_card/my_card?bid=${id}&state=3&name=${name}`, //传入名片id  state为3 已交换显示为您推荐列表
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
    let that = this;
    let data = {
      uid: wx.getStorageSync('user_id'),
      state: '3' //我同意的人脉列表
    };
    cardDetails.getHumanVeinList(data, res => {
      that.setData({
        renmaiList: res.data
      })
    })
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

  }
})