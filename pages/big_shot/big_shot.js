import {BigshotModel} from '../../models/big-shot.js';
const bigShotModel = new BigshotModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bigShotList:[],
    modelDetails:null,
    model_hidden:false,
    user_id: ''
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
    bigShotModel.getBigShotList({ user_id:user_id }, res => {
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
    let user_id = wx.getStorageSync('user_id');
    console.log(user_id);
    bigShotModel.getBigShotList({ user_id: user_id }, res => {
      if (res.code == 1) {
        this.setData({
          bigShotList: res.big_shot_list
        });
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
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
    bigShotModel.getBshotOrGuestDetails(that.data.user_id,bid,res=>{
      console.log(res);
      that.setData({
        model_hidden:true,
        modelDetails:res.big_shot_detail
      })
    })
  },
  toConsult:function(e){
    //获取用户是否授权
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/author/author',
          })
        }else{
          wx.navigateTo({
            url: '/pages/consult_platform/consult_platform',
          })
        }
      }
    })
  }
})