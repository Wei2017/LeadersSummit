// pages/edit_info/edit_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'], //省市区三级联动初始地区
    sex: ['男', '女'], //性别选择
    sexIndex: 0,
    sexChecked: '', //用户选中的性别的值
    position: ['HRM', 'CEO', 'COO', 'CTO', 'CFO'], //职位
    positionIndex: 0,
    positionChecked: '', //用户选中的职位的值
    industry: ['互联网IT', '金融', '房地产/建筑', '教育培训', '传媒广告', '生活服务', '专业咨询', '贸易/零售/物流', '生产制造'], //行业选择数组
    industryIndex: 0,
    industryChecked: '', //用户选中的行业的值
    companyNum: ['1-99','100-299','300-599','600以上'], //公司人数
    companyNumIndex: 0,
    companyNumChecked: ''//用户选中的公司人数的值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._setNavigationBarColor()
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
  // 保存用户信息
  saveInfo:function(){

  },
  // 性别选择
  bindSexChange: function(e) {
    console.log('性别为：', this.data.sex[e.detail.value])
    this.setData({
      sexIndex: e.detail.value
    })
  },
  // 职位选择
  bindPositionChange: function(e) {
    console.log('职位', this.data.position[e.detail.value])
    this.setData({
      positionIndex: e.detail.value
    })
  },
  // 省市区三级联动
  bindRegionChange: function(e) {
    console.log('所选地区：', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 行业选择
  bindIndustryChange: function(e) {
    console.log('行业：', this.data.industry[e.detail.value])
    this.setData({
      industryIndex: e.detail.value
    })
  },
  // 公司人数选择
  bindCompanyNumChange:function(e){
    console.log('公司人数：', this.data.companyNum[e.detail.value])
    this.setData({
      companyNumIndex: e.detail.value
    })
  },
  // 设置顶部导航条背景颜色
  _setNavigationBarColor: function() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ecb700'
    })
  }
})