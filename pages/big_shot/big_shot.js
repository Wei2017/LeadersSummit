import {BigshotModal} from '../../models/big-shot.js';
const bigShotModal = new BigshotModal();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bigShotList:[],
    modelDetails:null,
    model_hidden:false,
    user_id: wx.getStorageSync('user_id')
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let user_id = wx.getStorageSync('user_id');
    console.log(user_id);
    bigShotModal.getBigShotList({ user_id:user_id }, res => {
      if (res.code == 1) {
        this.setData({
          bigShotList: res.big_shot_list
        })
      }
    })
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

  },

  showModel:function(e){
    let that = this;
    let bid = e.detail.bid;
    bigShotModal.getBshotOrGuestDetails(that.data.user_id,bid,res=>{
      console.log(res);
      that.setData({
        model_hidden:true,
        modelDetails:res.big_shot_detail
      })
    })
  }
})