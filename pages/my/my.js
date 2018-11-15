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
    isWs: '0',
    rmState: false,
    newName: '',
    newPic: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    //设置头部导航栏背景颜色
    util.setnavBarBjColor();

    let uid = wx.getStorageSync('user_id');
    if (uid) {
      //显示我的人脉最新消息红点状态
      userInfoModel.getNewRenMai(uid, res => {
        if (res.status == 1) {
          that.setData({
            rmState: true
          })
        }
      });

      that._showUserInfo()
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
  //跳转wap端
  toWap: function() {
    if (this._authorize()) {
      wx.navigateTo({
        url: '/pages/logs/logs',
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
  //显示用户头像和昵称信息
  _showUserInfo() {
    let that = this;
    let unionid = wx.getStorageSync('unionid');
    let userInfo = wx.getStorageSync('user_info'); //微信头像 昵称
    console.log(that.data.pic,that.data.newPic)
    if (that.data.pic != that.data.newPic) {
      //显示用户头像
      userInfoModel.getUserInfo(unionid, res => {
        let signInfo = res.data.user_enroll_info[0]; //报名信息
        let cardInfo = res.data.user_info[0]; //名片信息
        if (cardInfo.business_card == '1') { //如果用户已完善名片信息
          let pic = cardInfo.largeAvatar.split('?'); //去除后台返回头像时间戳后缀
          that.setData({
            pic: pic[0],
            nickName: cardInfo.truename,
            isWs: cardInfo.business_card,
            newName: cardInfo.truename,
            newPic: pic[0]
          })
        } else {
          that.setData({
            pic: userInfo.avatarUrl,
            nickName: userInfo.nickName,
            newName: userInfo.nickName,
            newPic: userInfo.avatarUrl
          })
        }
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
    let that = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          that._showUserInfo();
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