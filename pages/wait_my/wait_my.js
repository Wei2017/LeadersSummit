import { CardDetails } from '../../models/card.js';
const cardDetails = new CardDetails();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    renmaiList: [],
    state: '2', //待我审核
    user_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      user_id: options.user_id
    });
  },
  //跳转点击的人脉详情
  toDetail: function(e) {
    let id = e.detail.id;
    let name = e.detail.name;
    wx.navigateTo({
      url: `/pages/my_card/my_card?bid=${id}&state=4&name=${name}`, //传入名片id  state为4 未审核通过显示同意和拒绝按钮
    })
  },

  //同意交换名片
  agreeExchange: function(e) {
    let that = this;
    let user_id = that.data.user_id;
    let pid = e.detail.id;
    let data = {
      pid: user_id, //我接收到的申请 传pid
      state: '1' //状态传1
    };
    cardDetails.dealRenMai(pid, user_id, '3', res => { //同意交换传3
      if (res.status == 1){
        cardDetails.getHumanVeinList(data, res => {
          that.setData({
            renmaiList: res.data
          })
        })
      }
      
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
      pid: wx.getStorageSync('user_id'), //当前用户接收到的申请 传pid
      state: '1' //状态传1
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