import {CardDetails } from '../../models/card.js';
const cardDetails = new CardDetails();
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
    cardState: '3', //1-6
    cardInfo: null,
    remaiList: [], //为您推荐列表
    user_id: '',
    pid: '',
    isWs: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let unionid = wx.getStorageSync('unionid');

    console.log(options)
    let cardState = options.state ? options.state : '';
    let isWs = options.isWs ? options.isWs : '';
    let pid = options.bid ? options.bid : '';
    let uid = options.uid ? options.uid : wx.getStorageSync('user_id');
    let name = options.name ? options.name : '';
    let title = '';
    that.setData({
      cardState: cardState,
      isWs: isWs,
      user_id: uid,
      pid: pid
    })
    //动态设置页面title信息
    switch (cardState) {
      case '1':
        title = '我的名片';
        break;
      default :
        title = name + '的名片';
    }
    //设置头部背景颜色和字体颜色
    util.setnavBarBjColor();
    //动态设置当前页面标题
    wx.setNavigationBarTitle({
      title: title
    });

    if (cardState != '1') {
      cardDetails.getCardDetails(pid, uid, res => {
        that.setData({
          cardInfo: res.data
        })
      });
    } else {
      userInfoModel.getUserInfo(unionid, res => {
        that.setData({
          cardInfo: res.data.user_info[0]
        })
      })
    }



    //已交换成功 显示推荐列表
    if (cardState == '3') {
      //获取人脉列表
      let data = {
        uid: wx.getStorageSync('user_id')
      }
      that._getRecommendList(data, pid)
    }
  },
  //获取推荐列表
  _getRecommendList: function(uid, bid) {
    let that = this;
    cardDetails.getHumanVeinList(uid, res => {
      let data = res.data;
      let newArr = [];

      //如果推荐中存在正在访问的名片 则不推荐
      for (let i = 0; i < data.length; i++) {
        if (data[i].uid != bid) {
          newArr.push(data[i])
        }
      }
      that.setData({
        remaiList: newArr
      })
    })
  },
  //点击去交换 跳转人脉列表页
  toExchange: function() {
    wx.switchTab({
      url: '/pages/renmai_list/renmai_list'
    })
  },
  //申请交换名片
  applyExchange: function() {
    let that = this;
    let wsState = that.data.isWs; //0,1
    let user_id = that.data.user_id;
    // 如果用户未授权则跳转授权页面
    if (!user_id) {
      wx.navigateTo({
        url: '/pages/author/author',
      })
    } else if (wsState == '0') { //如果用户未完善名片信息
      wx.navigateTo({
        url: '/pages/edit_info/edit_info',
      })
    } else {
      let pid = that.data.pid;
      //发起交换名片请求
      cardDetails.exchangeCards(user_id, pid, res => {
        console.log(res);
        that.setData({
          cardState: '5'
        })
      })
    }
  },
  //重新发起交换申请
  reExchange: function(e) {
    let that = this;
    let user_id = that.data.user_id;
    let pid = that.data.pid;
    cardDetails.exchangeCards(user_id, pid, res => {
      console.log(res, '126', user_id, pid);
      that.setData({
        cardState: '5'
      })
    })
  },

  //拒绝交换
  refuseExchange: function() {
    let pid = this.data.pid; //申请人id
    let uid = this.data.user_id; //处理人id
    cardDetails.dealRenMai(pid, uid, '2', res => {
      if (res.status == 1) { //处理成功后返回上一页面
        //返回上一页面
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  //同意交换
  agreeExchange: function() {
    let that = this,
      pid = this.data.pid, //申请人id
      uid = this.data.user_id; //处理人id
    //调取处理人脉接口
    cardDetails.dealRenMai(pid, uid, '3', res => {
      if (res.status == 1) { //处理成功后显示名片信息并渲染为您推荐列表
        cardDetails.getCardDetails(pid, uid, res => {
          that.setData({
            cardInfo: res.data,
            cardState: '3'
          })
          //获取人脉列表
          let data = {
            uid: uid
          };
          //渲染为您推荐列表
          that._getRecommendList(data, pid)
        });
      }
    })
  },


  //判断跳转
  judgeJump: function(e) {
    let that = this;
    let wsState = that.data.isWs; //0,1
    let user_id = wx.getStorageSync('user_id')

    let pid = e.detail.pid;
    let state = e.detail.state;
    console.log(user_id, pid, state);
    //如果未申请过交换名片请求 则发送交换请求
    if (!state) {
      //发起交换名片请求
      cardDetails.exchangeCards(user_id, pid, res => {
        let data = {
          uid: user_id
        }
        cardDetails.getHumanVeinList(data, res => {
          that.setData({
            remaiList: res.data
          })
        })
      })
    }

  },



  //推荐列表跳转详情
  toDetails: function(e) {
    console.log(e);
    let that = this;
    let bid = e.detail.bid;
    let state = e.detail.state == '1' ? '5' : e.detail.state == '2' ? '6' : '2';
    let name = e.detail.name;
    wx.navigateTo({
      url: `/pages/my_card/my_card?bid=${bid}&uid=${that.data.user_id}&state=${state}&isWs=${that.data.isWs}&name=${name}`
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

  },

  jumpSq: function() {
    let state = false;
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/author/author',
          })
        }
      }
    })
  }
})