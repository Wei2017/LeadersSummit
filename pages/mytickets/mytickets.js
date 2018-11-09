
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "",
    nickname: "",
    avatarUrl:"",
    imgWidth: 289,
    imgHeight:488,
    shareurl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var self = this;
    wx.getUserInfo({
      success: function (res) {
        // console.log(res);
        self.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        });
        wx.downloadFile({
          url: self.data.avatarUrl,
          success: function (res) {
            console.log(res.tempFilePath);
            self.setData({
              avatarUrl: res.tempFilePath,
            })

            //绘图方法
            var contex = wx.createCanvasContext('myCanvas');
            var imgUrl = "../../images/menpiao.png";
            var header = self.data.avatarUrl;
            // var header = "";
            var name = self.data.nickName;
            console.log(header)
            var avatarurl_width = 289;
            var avatarurl_heigth = 488;
            contex.drawImage(imgUrl, 0, 0, avatarurl_width, avatarurl_heigth);
            contex.restore();
            contex.save();
            contex.beginPath();
            contex.arc(150, 255, 30, 0, Math.PI * 2, false);
            contex.clip();
            contex.drawImage(self.data.avatarUrl, 120, 225, 60, 60);
            contex.restore();
            contex.setFontSize(12)
            contex.fillStyle = "#de2417";
            contex.fillText(name, 135, 302);
            contex.draw(true, setTimeout(function () {
              wx.canvasToTempFilePath({//导出图片
                width: 289,
                height: 488,
                destWidth: 289,
                destHeight: 488,
                canvasId: 'myCanvas',
                success: res => {
                  console.log(res.tempFilePath)
                  self.setData({
                    avatarUrl: res.tempFilePath
                  })
                }
              }, this)
            }, 100))

          }, fail: function (fres) {

          }
        });
        
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})