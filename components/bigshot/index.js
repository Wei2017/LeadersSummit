// components/bigshot/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bigShot:Object
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
    appBigShot:function(e){
      let state = this.data.bigShot.make,  //预约状态 0为未预约 1为已预约
          big_id = this.data.bigShot.id;//大咖id
        let that = this;
      //判断用户是否授权
      wx.getSetting({
        success: function (res) {
          if (!res.authSetting['scope.userInfo'] || wx.getStorageSync('user_id') =='') {
            wx.navigateTo({
              url: '/pages/author/author',
            })
          }else{
            if (state == '0') {
              wx.navigateTo({
                url: '/pages/consult_index/consult_index?bid=' + big_id,
              })
            }
          }
        }
      })
    },

    showDetails(){
      let big_id = this.data.bigShot.id;
      this.triggerEvent('showModel',{bid:big_id});
    }
  }
})
