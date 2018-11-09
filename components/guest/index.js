// components/guest/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    guestObj:Object
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
    mess(){
      console.log(this.data.guestObj);
      if (wx.getStorageSync('user_id') && wx.getStorageSync('user_id') != "") {
        let big_id = this.data.guestObj.big_id;
        this.triggerEvent('showModel', { bid: big_id });
      }else{
        wx.navigateTo({
          url: "/pages/author/author"
        })
      }
    }
  }
})
