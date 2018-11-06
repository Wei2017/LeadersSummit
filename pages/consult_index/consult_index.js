import {ConsultModal} from '../../models/consult.js';
const consultModal = new ConsultModal();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bid:'',
    user_id:'',
    consultType:'',//咨询类型
    consultPhone:'',//联系方式
    consultCon:'' //咨询内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setnavBarBjColor();
    this.setData({
      bid: options.bid
    })
    // consultModal.getBigShotInfo({big_id: options.bid},res=>{
    //   console.log(res)
    // })
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