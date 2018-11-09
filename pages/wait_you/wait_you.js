import { HumanVein } from '../../models/human_vein.js';
const humanVein = new HumanVein();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    renmaiList: [],
    state: '3', //对方审核
    user_id: '',
    wait:[], //等待同意的名片
    refuse:[] //拒绝的名片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      user_id: options.user_id
    });
    let data = {
      uid: options.user_id,//我发出的申请  传uid
      state: '2,1'//状态传2,1  拒绝和等待同意
    };


    humanVein.getHumanVeinList(data, res => {
      that.setData({
        renmaiList: res.data
      })
    })
    
  },
  //跳转点击的人脉详情
  toDetail:function(e){
    let id = e.detail.id;
    let state = e.detail.state;
    //5等待审核  6用户已拒绝
    state = state == 1?5:state == 2?6:''
    // if(state == 1){
    //   state = 5
    // }else if(state == 2){
    //   state = 6
    // }
    wx.navigateTo({
      url: `/pages/my_card/my_card?bid=${id}&state=${state}`, //传入名片id  state为4 未审核通过显示同意和拒绝按钮
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