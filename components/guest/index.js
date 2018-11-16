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
        let id = this.data.guestObj.id;
        this.triggerEvent('showModel', { guest_id: id });
      }else{
        wx.navigateTo({
          url: "/pages/author/author"
        })
      }
    }
  }
})
