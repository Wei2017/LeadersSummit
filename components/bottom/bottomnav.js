// components/bottom/bottomnav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num:String,
    sign: String
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
    gosign(){
      wx.navigateTo({
        url: "/pages/signup/signup"
      })
    },
    gohome() {
      if(this.data.num!=0){
        wx.redirectTo({
          url: "/pages/home/home"
        })
      }
    },
    gopeople() {
      if (this.data.num != 1) {
        wx.redirectTo({
          url: "/pages/renmai_list/renmai_list"
        })
      }
    },
    godaka() {
      if (this.data.num != 2) {
        wx.redirectTo({
          url: "/pages/big_shot/big_shot"
        })
      }
    },
    gomine() {
      if (this.data.num != 3) {
        wx.redirectTo({
          url: "/pages/my/my"
        })
      }
    }

  }
})
