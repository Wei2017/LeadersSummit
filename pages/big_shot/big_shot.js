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
  _getBigShotList(state){
    let user_id = wx.getStorageSync('user_id');
    console.log(user_id);
    bigShotModel.getBigShotList({ user_id: user_id }, res => {
      if (res.code == 1) {
        this.setData({
          bigShotList: res.big_shot_list
        });

        if(state){
          // 停止下拉动作
          wx.stopPullDownRefresh();
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._getBigShotList(false)
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
    this._getBigShotList(true)
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
    let user_id = wx.getStorageSync('user_id');
    console.log(user_id);
    bigShotModel.getBshotOrGuestDetails(user_id,bid,res=>{
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
  },
  gotoConsult:function(e){
    let that = this;
    let big_id = e.detail.guest_id;
    //判断用户是否授权
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo'] || wx.getStorageSync('user_id') == '') {
          wx.navigateTo({
            url: '/pages/author/author',
          })
        } else {
          wx.navigateTo({
            url: '/pages/consult_index/consult_index?guest_id=&bid=' + big_id,
          })
        }
        //隐藏弹框
        that.setData({
          model_hidden: false
        })
      }
    })
  }
})