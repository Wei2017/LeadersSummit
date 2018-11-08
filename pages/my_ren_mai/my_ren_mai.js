import {HumanVein} from '../../models/human_vein.js';
const humanVein = new HumanVein();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:'',
    isWs:''//完善名片状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isWs: options.isWs
    })
    let user_id = wx.getStorageSync('user_id');
    let data = {
      uid:user_id,
      state:'3'
    };
    humanVein.getHumanVeinList(data,res=>{
      console.log(res);
    })
  },
  toCard:function(e){
    let that = this;
    let wsState = that.data.isWs; //0,1
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