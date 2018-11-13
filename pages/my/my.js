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
    pic: '',
    nickName: '',
    isWs: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let unionid = wx.getStorageSync('unionid');
    //设置头部导航栏背景颜色
    util.setnavBarBjColor();

    userInfoModel.getUserInfo(unionid, res => {
      let data = res.data.user_info[0];
      console.log(data);
      let wsNum = data.business_card; //是否完善名片 1完善 0未完善

      if (wsNum == '0') {
        //获取用户昵称和头像
        wx.getUserInfo({
          success: function(res) {
            console.log(res);
            that.setData({
              pic: res.userInfo.avatarUrl,
              nickName: res.userInfo.nickName,
              isWs: wsNum
            })
          }
        })
      } else {
        that.setData({
          pic: data.largeAvatar,
          nickName: data.truename,
          isWs: wsNum
        })
      }
    })

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
      wx.navigateTo({
        url: '/pages/mytickets/mytickets',
      })
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
  _authorize: function () {
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