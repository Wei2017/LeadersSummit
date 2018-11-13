const App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchCon: String,
    searchVal: String
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
    toMyCard() {
      this.triggerEvent('toCard', {})
    },
    //获取搜索内容
    getSearchVal(e){
      let searchVal = e.detail.value;
      this.setData({
        searchVal: searchVal
      })
    },

    search(){
      let searchVal = this.data.searchVal;
      this.triggerEvent('search', { val: searchVal})
    }
  }
})