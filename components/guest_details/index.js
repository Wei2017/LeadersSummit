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
    hideModel(){
      this.setData({
        modelHidden:false
      })
    }
  }
})
