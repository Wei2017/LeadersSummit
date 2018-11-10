// pages/details/details.js
import { HTTP } from '../../utils/http.js';
const http = new HTTP();
import { BigshotModal } from '../../models/big-shot.js';
const bigShotModal = new BigshotModal();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    guestList:[],
    small_outline:"",
    small_schedule:"",
    modelDetails: null,
    model_hidden: false,
    sign:0

  },
  tab: function (e) {
    var dataId = e.currentTarget.id;
    console.log(dataId)
    var obj = {};
    obj.curHdIndex = dataId;
    obj.curBdIndex = dataId;
    console.log(obj)
    this.setData({
      tabArr: obj
    })
  },
  gobao: function (e) {
    console.log(e);
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
  gomenpiao:function(e){
    wx.navigateTo({
      url: "/pages/mytickets/mytickets"
    })
  },
  showModel: function (e) {
    let that = this;
    console.log(e);
    let bid = e.detail.bid;
    bigShotModal.getBshotOrGuestDetails(that.data.user_id, bid, res => {
      console.log(res);
      that.setData({
        model_hidden: true,
        modelDetails: res.big_shot_detail
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let unionid = wx.getStorageSync('unionid');
    // bigShotModal.getSignUpState(unionid,res=>{
    //   console.log(res);
    // })
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
    var that = this;
    http.request({
      url: "Smallwx/meetingDetail",
      data: {
        user_id: wx.getStorageSync('user_id')
      },
      success: res => {
        console.log(res)
        that.setData({
          small_schedule: res.meeting.small_schedule,
          small_outline: res.meeting.small_outline,
          guestList: res.meeting.meeting_guest_list
        })
      }
    })
    let id = wx.getStorageSync('unionid');
    bigShotModal.getSignUpState(id,res=>{
      console.log(res);
      let sign = res.data.user_enroll_info[0] ? '1' : '0';
      wx.setStorageSync('sign', sign);
      that.setData({
        sign: sign
      })
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

  }
})