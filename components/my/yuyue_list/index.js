// components/my/yuyue_list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    makeShotList:Object
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
    toDetails(){
      let make_id = this.data.makeShotList.id;
      console.log(make_id);
      wx.navigateTo({
        url: '/pages/consult_details/consult_details?make_id='+make_id,
      })
    }
  }
})
