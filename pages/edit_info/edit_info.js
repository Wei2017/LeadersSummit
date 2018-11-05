import {UserInfoModal} from '../../models/user-info.js'
const userInfoModal = new UserInfoModal();
const util = require('../../utils/util.js');
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:'119152',//用户id
    region: ['广东省', '广州市', '海珠区'], //省市区三级联动初始地区
    sex: ['请选择','男', '女','保密'], //性别选择
    sexIndex: 0,
    sexChecked: '', //用户选中的性别的值
    position: ['请选择','HRM', 'CEO', 'COO', 'CTO', 'CFO'], //职位
    positionIndex: 0,
    positionChecked: '', //用户选中的职位的值
    industry: ['请选择','互联网IT', '金融', '房地产/建筑', '教育培训', '传媒广告', '生活服务', '专业咨询', '贸易/零售/物流', '生产制造'], //行业选择数组
    industryIndex: 0,
    industryChecked: '', //用户选中的行业的值
    companyNum: ['请选择','1-99','100-299','300-599','600以上'], //公司人数
    companyNumIndex: 0,
    companyNumChecked: '',//用户选中的公司人数的值

    userName:'',
    userPhone:'13466608250',
    userCompany:'',
    userTel:'',
    userEmail:'',
    userAddress:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //设置头部导航条样式
    util.setnavBarBjColor();

    //获取用户信息
    // userInfoModal.getUserInfo(res=>{
    //   console.log(res);
    // })
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
    let that = this;
    if(that.data.userName == ''){
      util.showTotal('姓名不能为空!')
    }else if(!that._checkPhone(that.data.userPhone)){
      util.showTotal('请输入正确的手机号码!')
    }else if (that.data.userPhone == ''){
      util.showTotal('手机号不能为空!')
    }else if(that.data.userCompany == ''){
      util.showTotal('公司不能为空!')
    } else if (that.data.positionChecked == '' || that.data.positionChecked =='请选择'){
      util.showTotal('请选择职位!')
    }else if(that.data.userTel == ''){
      util.showTotal('电话不能为空!')
    }else if(that.data.userEmail == ''){
      util.showTotal('邮箱不能为空!')
    } else if (that.data.industryChecked == '' || that.data.industryChecked =='请选择' ){
      util.showTotal('请选择行业!')
    } else if (that.data.companyNumChecked == '' || that.data.companyNumChecked == '请选择'){
      util.showTotal('请选择公司人数!')
    }else {
      let strRegion = that.data.region;
          strRegion = strRegion.join('');

      let data = {
        uid:that.data.uid,
        truename: that.data.userName,
        gender: that.data.sexChecked == '男'?'1':that.data.sexChecked =='女'?'2':'3',
        mobile: that.data.userPhone,
        company: that.data.userCompany,
        company_mobile: that.data.userTel,
        department:'',
        job:'',
        city: strRegion,
        address: that.data.userAddress,
        industry:'',
        company_employee_count: that.data.companyNumChecked
      }
      //调取接口
      userInfoModal.saveUserInfo(data,res=>{
        console.log(res);
        if(res.code == '1'){
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  },
  //获取用户输入
  // 获取姓名
  getName:function(e){
    this.setData({
      userName: e.detail.value
    })
  },
  //获取手机号
  getPhone:function(e){
    this.setData({
      userPhone: e.detail.value
    })
  },
  //获取公司名称
  getCompany:function(e){
    this.setData({
      userCompany: e.detail.value
    })
  },
  //获取公司电话
  getTel:function(e){
    this.setData({
      userTel: e.detail.value
    })
  },
  //获取邮箱
  getEmail:function(e){
    this.setData({
      userEmail: e.detail.value
    })
  },
  //获取地址
  getAddress:function(e){
    this.setData({
      userAddress: e.detail.value
    })
  },
  // 性别选择
  bindSexChange: function(e) {
    let sex = this.data.sex[e.detail.value];
    console.log('下标为：', e.detail.value,'性别为：'+sex)
    this.setData({
      sexChecked: sex,
      sexIndex:e.detail.value
    })
  },
  // 职位选择
  bindPositionChange: function(e) {
    let position = this.data.position[e.detail.value];
    console.log('下标为：', e.detail.value,'职位:'+position)
    this.setData({
      positionChecked: position,
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
    let industry = this.data.industry[e.detail.value];
    console.log('下表为：', e.detail.value,'行业：'+industry)
    this.setData({
      industryChecked: industry,
      industryIndex: e.detail.value
    })
  },
  // 公司人数选择
  bindCompanyNumChange:function(e){
    let company_num = this.data.companyNum[e.detail.value];
    console.log('下表为', e.detail.value,'公司人数：'+company_num)
    this.setData({
      companyNumChecked: company_num,
      companyNumIndex:e.detail.value
    })
  },
  _checkPhone:function(phone){
    var ruler = /^(1([34578][0-9]))\d{8}$/;
    return ruler.test(phone);
  }
})