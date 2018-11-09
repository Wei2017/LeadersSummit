import { HumanVein } from '../../models/human_vein.js';
const humanVein = new HumanVein();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    renmaiList:[],
    state:'2', //待我审核
    user_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      user_id:options.user_id
    });
    let data = {
      pid: options.user_id,//我接收到的申请 传pid
      state: '1'//状态传1
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
    wx.navigateTo({
      url: '/pages/my_card/my_card?bid=' + id + '&state=4', //传入名片id  state为4 未审核通过显示同意和拒绝按钮
    })
  },

  //同意交换名片
  agreeExchange:function(e){
    console.log(e);
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