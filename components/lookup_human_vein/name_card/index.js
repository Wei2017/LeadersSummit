// components/name_card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo:Object,
    state:String,
    pic:String
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
    editInfo(){
      wx.navigateTo({
        url: '/pages/edit_info/edit_info',
      })
    }
  }
})
