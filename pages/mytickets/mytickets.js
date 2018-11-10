
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskHidden: false,
    bjImgSrc: '../../images/menpiao.png',
    pic: '',
    nickName: '',
    imageWidth: '',
    imageHeight: '',
    imagePath:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth,
      imageHeight: wx.getSystemInfoSync().windowHeight
    })

    wx.getUserInfo({    //获取微信用户信息
      success: function (res) {
        console.log(res);
        that._getImageInfo(res.userInfo.avatarUrl);  //  调取图片处理方法
        that.setData({
          nickName: res.userInfo.nickName
        });
      }
    });
  },
  _getImageInfo(url) {    //  图片缓存本地的方法
  let that = this;
    if (typeof url === 'string') {
      wx.getImageInfo({   //  小程序获取图片信息API
        src: url,
        success: function (res) {
          that.setData({
            pic: res.path
          })
        },
        fail(err) {
          console.log(err)
        }
      })
    }

    that.formSubmit();
  },
  previewImage: function (e) {
    let that = this;
    console.log(e);
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接 
      urls: that.data.imagePath // 需要预览的图片http链接列表 
    })
  },

  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    context.setFillStyle("#000")
    // context.fillRect(0, 0, 375, 1200)
    var path = that.data.bjImgSrc;
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    //不知道是什么原因，手机环境能正常显示
    context.drawImage(path, 0, 0, 375, 580);
    var path1 = that.data.pic;
    console.log(path1, "path1")
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片

    // context.drawImage(path2, 126, 186, 120, 120);
    //不知道是什么原因，手机环境能正常显示
    // context.save(); // 保存当前context的状态

    var name = that.data.nickName;
    //绘制名字
    context.setFontSize(12);
    context.setFillStyle('#333333');
    context.setTextAlign('center');
    context.fillText(name, 185, 350);
    context.stroke();


    //绘制头像
    context.arc(190, 295, 40, 0, 2 * Math.PI) //画出圆
    context.strokeStyle = "#ffe200";
    context.clip(); //裁剪上面的圆形
    context.drawImage(path1, 140, 245, 100, 100); // 在刚刚裁剪的园上画图
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        fileType: 'jpg',
        canvasId: 'mycanvas',
        success: function (res) {
          console.log(res);
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 200);
  },
  //点击保存到相册
  baocun: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              // that.setData({
              // 	maskHidden: false
              // })
            }
          },
          fail: function (res) {
            console.log(11111)
          }
        })
      }
    })
  },
  //点击生成
  formSubmit: function (e) {
    var that = this;
    this.setData({
      maskHidden: false
    });
    wx.showToast({
      title: '图片生成中...',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function () {
      wx.hideToast()
      that.createNewImg();
      that.setData({
        maskHidden: true
      });
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: "这个是我分享出来的东西",
      success: function (res) {
        console.log(res, "转发成功")
      },
      fail: function (res) {
        console.log(res, "转发失败")
      }
    }
  }
})