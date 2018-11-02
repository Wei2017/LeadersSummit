// components/human_vein/card_cover/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    picSrc:String,
    userName:String,
    company:String,
    position:String,
    exchangeState:Boolean  //交换名片状态
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

  }
})
