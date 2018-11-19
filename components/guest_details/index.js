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
      //隐藏弹框
      this.hideModel();
      let id = this.data.modelDetails.id;
      let big_id = this.data.modelDetails.big_id;
      this.triggerEvent('toConsult',{guest_id:id,big_id:big_id})
    }
  }
})
