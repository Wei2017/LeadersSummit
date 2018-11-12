// components/my/human_vein/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    renmaiList:Object,
    state:String  //1我的人脉 2待我审核 3对方审核
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
      let id = this.data.renmaiList.id;
      let state = this.data.renmaiList.state;
      let name = this.data.renmaiList.truename;
      this.triggerEvent('detail',{id:id,state:state,name:name})
    },
    agreeExchange(){
      let id = this.data.renmaiList.id;
      this.triggerEvent('agree', { id: id })
    }
  }
})
