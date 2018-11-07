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
      let pid = this.data.cardList.id;
      this.triggerEvent('perfect', { pid: pid})
    },
    toCardDetail(){
      let bid = this.data.cardList.id;
      this.triggerEvent('detail',{bid:bid})
    }
  }
})
