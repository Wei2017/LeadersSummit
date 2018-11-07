// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    guestList:[]
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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