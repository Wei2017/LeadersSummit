// pages/details/details.js
import {BigshotModel } from '../../models/big-shot.js';
const bigShotModel = new BigshotModel();
import {
  UserInfoModel
} from '../../models/user-info.js';
const userInfoModel = new UserInfoModel();
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
    sign:0,
    guestBjHeight:'',
    unionid:''
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
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: "/pages/author/author"
          })
        }else{
          wx.navigateTo({
            url: "/pages/mytickets/mytickets"
          })
        }
      }
    })
  },
  showModel: function (e) {
    let that = this;
    let guest_id = e.detail.guest_id;
    let user_id = wx.getStorageSync('user_id');
    user_id = user_id ? user_id:''
    bigShotModel.getGuestInfo(guest_id, user_id, res => {
      console.log(res);
      that.setData({
        model_hidden: true,
        modelDetails: res.guest_detail
      })
    })
  },
  //跳转咨询详情
  toConsult:function(e){
    let that = this;
    console.log(e);
    let big_id = e.detail.big_id;
    //判断用户是否授权
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo'] || wx.getStorageSync('user_id') == '') {
          wx.navigateTo({
            url: '/pages/author/author',
          })
        } else {
          wx.navigateTo({
            url: '/pages/consult_index/consult_index?bid=&guest_id=' + big_id,
          })
        }
        //隐藏弹框
        that.setData({
          model_hidden: false
        })
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高  
      success: function (res) {
        // let width = res.windowWidth
        let height = res.windowHeight
        // let radius = 105 / 602 * height
        // console.log(res,width,height,radius);
        that.setData({
          guestBjHeight: height,
          unionid: wx.getStorageSync('unionid')
        })
      }
    });

    let user_id = wx.getStorageSync('user_id');
    wx.showLoading({
      title: '加载中',
    })
    bigShotModel.getHomeBj(user_id, res => {
      if (res.code == 1) {
        that.setData({
          small_schedule: res.meeting.small_schedule,
          small_outline: res.meeting.small_outline,
        })
        if (that.data.small_schedule != '') {
          wx.hideLoading()
        }
      }
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
    let that = this;
    let user_id = wx.getStorageSync('user_id');
    bigShotModel.getHomeBj(user_id, res => {
      if (res.code == 1) {
        that.setData({
          guestList: res.meeting.meeting_guest_list
        })
      }
    })


    //获取用户是否授权 如果授权才获取用户报名状态信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          let unionid = that.data.unionid;
          console.log(that.data);
          //获取报名状态 显示 报名或查看门票
          unionid = unionid ? unionid : wx.getStorageSync('unionid');
          userInfoModel.getUserInfo(unionid, res => {
            console.log(res);
            //是否填写过报名信息
            let data = res.data.user_enroll_info[0];
            if(data){
              let examine = data.examine; //2为报名成功
              let sign = examine == '2' ? '1' : '0';
              that.setData({
                sign: sign
              })
            }
          })
        }
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

  }
})