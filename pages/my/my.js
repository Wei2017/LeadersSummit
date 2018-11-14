import {
  UserInfoModel
} from '../../models/user-info.js';
const userInfoModel = new UserInfoModel();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: '../../images/logo@3x.png',
    nickName: '请授权',
    isWs: '',
    rmState: false,
    newName:'',
    newPic:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let unionid = wx.getStorageSync('unionid');
    //设置头部导航栏背景颜色
    util.setnavBarBjColor();

    userInfoModel.getUserInfo(unionid,res=>{
      let data = res.data.user_info[0];
      let isWs = data.business_card;
      if (isWs == '1'){ //是否完善了名片信息
        that.setData({
          newPic: data.largeAvatar,
          newName: data.truename,
          isWs: isWs
        })
      }else{//未完善名片信息
        that.setData({
          isWs: isWs
        })
        let userInfo = wx.getStorageSync('user_info');
        if (userInfo) {
          that.setData({
            pic: userInfo.avatarUrl,
            nickName: userInfo.nickName
          })
        }
      }
    })

    let uid = wx.getStorageSync('user_id');
    if (uid) {
      userInfoModel.getNewRenMai(uid, res => {
        if (res.status == 1) {
          that.setData({
            rmState: true
          })
        }
      })
    }
  },
  editInfo: function() {
    if (this._authorize()) {
      wx.navigateTo({
        url: '/pages/edit_info/edit_info',
      })
    }
  },
  //跳转峰会门票页面
  toTicket: function() {
    if (this._authorize()) {
      //授权完成判断是否报名峰会  1已报名 否则跳转报名页
      if (wx.getStorageSync('sign') == 1) {
        wx.navigateTo({
          url: '/pages/mytickets/mytickets',
        })
      } else {
        wx.navigateTo({
          url: '/pages/signup/signup',
        })
      }
    }
  },
  //跳转我的人脉页面
  toRenmai: function() {
    if (this._authorize()) {
      wx.navigateTo({
        url: '/pages/my_ren_mai/my_ren_mai?isWs=' + this.data.isWs,
      })
    }
  },
  //跳转我的预约页面
  toYuyue: function() {
    if (this._authorize()) {
      wx.navigateTo({
        url: '/pages/my_yue_list/my_yue_list',
      })
    }
  },
  //跳转留言板页面
  toMessage: function() {
    if (this._authorize()) {
      wx.navigateTo({
        url: '/pages/message/message',
      })
    }
  },
  //私有方法 判断是否授权
  _authorize: function() {
    let user_id = wx.getStorageSync('user_id');
    if (!user_id) {
      wx.navigateTo({
        url: '/pages/author/author',
      })
    } else {
      return true;
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
    let that = this;
    let userInfo = wx.getStorageSync('user_info');
    wx.getSetting({
      success: function (res) {
        //如果用户授权成功并 名片已完善则显示名片的头像与昵称
        if (res.authSetting['scope.userInfo'] && that.data.isWs == '1') {
          that.setData({
            pic: that.data.newPic,
            nickName: that.data.newName
          })
        } else if (userInfo) { //否则 显示微信的头像和昵称
          that.setData({
            pic: userInfo.avatarUrl,
            nickName: userInfo.nickName,
          })
        }
      }
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