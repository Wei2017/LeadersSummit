const App = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardList:Object,
    isWsCard:String //是否完善名片信息 0未完善 1已完善
  },

  /**
   * 组件的初始数据
   */
  data: {
    exchangeSrc:'images/exchangeSrc.png',
    exchangeIngSrc:'images/exchangeIngSrc.png',
    change:'images/jiaohuan.png',
    jh_text:'交换',
    jh_ing:'交换中'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    exchangeFun(e){
      let isWsInfo = this.data.isWsCard;
      this.triggerEvent('perfect', {})
    }
    // exchangeFun: function (e) {
      
      // let user_id = wx.getStorageSync('user_id')
      // // 如果用户未授权则跳转授权页面
      // if (!user_id) {
      //   wx.navigateTo({
      //     url: '/pages/author/author',
      //   })
      // } else if (this.data.isWsCard == '0') { //如果用户未完善名片信息
      //   wx.navigateTo({
      //     url: '/pages/edit_info/edit_info',
      //   })
      // } else {
      //   //发起交换名片请求
      // }
      // console.log(App.globalData.userInfo)
      // console.log(this.data.isWsCard);
    // }
  }
})
