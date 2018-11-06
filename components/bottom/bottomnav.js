// components/bottom/bottomnav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num:String,
    sign: String
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
    gosign(){
      wx.navigateTo({
        url: "/pages/signup/signup"
      })
    }
  }
})
