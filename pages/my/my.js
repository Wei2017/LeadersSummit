import {UserInfoModal } from '../../models/user-info.js'
const userInfoModal = new UserInfoModal();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic:'',
    nickName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let unionid = wx.getStorageSync('unionid');
    //设置头部导航栏背景颜色
    util.setnavBarBjColor();


    userInfoModal.getUserInfo(unionid,res=>{
     
      let data = res.data.user_info[0];
      let wsNum = data.business_card; //是否完善名片 1完善 0未完善
      if(wsNum == '0'){
        //获取用户昵称和头像
        wx.getUserInfo({
          success: function (res) {
            console.log(res);
            that.setData({
              pic: res.userInfo.avatarUrl,
              nickName: res.userInfo.nickName
            })
          }
        })
      }else{
        that.setData({
          pic: data.largeAvatar,
          nickName: data.truename
        })
      }
    })
    
  },
  editInfo:function(){
    wx.navigateTo({
      url: '/pages/edit_info/edit_info',
    })
  },
  //跳转峰会门票页面
  toTicket:function(){
    wx.navigateTo({
      url: '/pages/mytickets/mytickets',
    })
  },
  //跳转我的人脉页面
  toRenmai:function(){
    wx.navigateTo({
      url: '/pages/my_ren_mai/my_ren_mai',
    })
  },
  //跳转我的预约页面
  toYuyue:function(){
    wx.navigateTo({
      url: '/pages/my_yue_list/my_yue_list',
    })
  },
  //跳转留言板页面
  toMessage:function(){
    wx.navigateTo({
      url: '/pages/message/message',
    })
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