// components/guest_details/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modelDetails:Object,
    modelHidden:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏弹出层
    hideModel(){
      this.setData({
        modelHidden:false
      })
    },

    //自定义事件 获取咨询id
    makeConsult(){
      let id = this.data.modelDetails.id;
      //判断用户是否授权
      wx.getSetting({
        success: function (res) {
          if (!res.authSetting['scope.userInfo'] || wx.getStorageSync('user_id') == '') {
            wx.navigateTo({
              url: '/pages/author/author',
            })
          } else {
            wx.navigateTo({
              url: '/pages/consult_index/consult_index?bid=' + id,
            })
          }
        }
      })
    }
  }
})
