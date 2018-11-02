// components/yuyue_zixun/consult/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    consult:['个人咨询','企业咨询'],
    consultIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 咨询类型选择
    bindConsultChange: function (e) {
      console.log('咨询类型为：', this.data.consult[e.detail.value])
      this.setData({
        consultIndex: e.detail.value
      })
    },
  }
})
