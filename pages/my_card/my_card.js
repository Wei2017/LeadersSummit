import {
  CardDetails
} from '../../models/card.js';
const cardDetails = new CardDetails();
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardState: '3', //1-6
    cardInfo: null,
    remaiList: [], //为您推荐列表
    user_id:'',
    pid:'',
    isWs:''
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
    that.setData({
      cardState: cardState,
      isWs: isWs,
      user_id:uid,
      pid: pid
    })
    //设置头部背景颜色和字体颜色
    util.setnavBarBjColor();
    //动态设置当前页面标题
    wx.setNavigationBarTitle({
      title: '当前页面'
    });

    if (cardState != '1'){
      cardDetails.getCardDetails(pid, uid, res => {
        that.setData({
          cardInfo: res.data
        })
      });
    }else{
      cardDetails.getCardState(unionid,res=>{
        that.setData({
          cardInfo: res.data.user_info[0]
        })
      })
    }
    

    //获取人脉列表
    let data = {
      uid: wx.getStorageSync('user_id')
    }
    //已交换成功 显示推荐列表
    if (cardState == '3') {
      cardDetails.getHumanVeinList(data, res => {
        let data = res.data;
        let newArr = [];

        //如果推荐中存在正在访问的名片 则不推荐
        for (let i = 0; i < data.length; i++) {
          if (data[i].uid != options.bid){
            newArr.push(data[i])
          }
        }
        that.setData({
          remaiList: newArr
        })
      })
    }
  },
  //点击去交换 返回上一层人脉列表页
  toExchange:function(){
    wx.navigateBack({
      delta:1
    })
  },
  //申请交换名片
  applyExchange:function(){
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
          cardState:'5'
        })
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