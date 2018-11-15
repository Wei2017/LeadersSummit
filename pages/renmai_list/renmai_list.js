import {CardDetails } from '../../models/card.js';
const cardDetails = new CardDetails();
import {UserInfoModel } from '../../models/user-info.js';
const userInfoModel = new UserInfoModel();
const util = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    remaiList: [],
    isWanShan: '', //0未完善 跳转编辑资料页面 1已完善触发交换事件
    user_id: '',
    unionid: '',
    searchVal:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let user_id = wx.getStorageSync('user_id');
    let unionid = wx.getStorageSync('unionid');
    that.setData({
      user_id: user_id,
      unionid: unionid
    })
    

    //获取完善资料状态
    userInfoModel.getUserInfo(unionid, res => {
      that.setData({
        isWanShan: res.data.user_info[0].business_card
      })
    })
  },

  //判断跳转
  judgeJump: function(e) {
    let that = this;
    let wsState = that.data.isWanShan; //0,1
    console.log(wsState);
    let user_id = wx.getStorageSync('user_id')
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
      let pid = e.detail.pid;
      let state = e.detail.state;
      //如果未申请过交换名片请求 则发送交换请求
      if (!state) {
        //发起交换名片请求
        cardDetails.exchangeCards(user_id, pid, res => {
          util.showTotal('交换名片请求已发送,等待对方同意')
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
    }
  },
  // 跳转详情
  toDetails: function(e) {
    console.log(e);
    let that = this;
    let bid = e.detail.bid;
    let state = e.detail.state == '1' ? '5' : e.detail.state == '2' ? '6' : '2';
    let name = e.detail.name;
    wx.navigateTo({
      url: `/pages/my_card/my_card?bid=${bid}&uid=${that.data.user_id}&state=${state}&isWs=${that.data.isWanShan}&name=${name}`
    })
  },
  //跳转我的名片
  toCard: function(e) {
    let that = this;
    let wsState = that.data.isWanShan; //0,1
    let user_id = wx.getStorageSync('user_id')
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
      wx.navigateTo({
        url: '/pages/my_card/my_card?state=1',
      })
    }
  },
  //搜索人脉
  searchRenmai:function(e){
    let that = this;
    let searchVal = e.detail.val;
    if(searchVal == ''){
      util.showTotal('请输入搜索条件!')
    }else{
      let data = {
        search_content: searchVal
      }
      cardDetails.getHumanVeinList(data, res => {
        let data = res.data;
        let uid = that.data.user_id;
        let newRmArr = [];
        //搜索列表不展示当前搜索用户信息
        for(let i = 0;i<data.length;i++){
          if (uid != data[i].uid){
            newRmArr.push(data[i])
          }
        }
        that.setData({
          remaiList: newRmArr,
          searchVal: ''
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
    let that = this;
    //获取人脉列表
    let data = {
      uid: wx.getStorageSync('user_id')
    }
    cardDetails.getHumanVeinList(data, res => {
      console.log(res.data)
      that.setData({
        remaiList: res.data
      })
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