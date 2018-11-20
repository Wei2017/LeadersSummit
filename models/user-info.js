import {HTTP} from '../utils/http.js';

class UserInfoModel extends HTTP{
  getUserInfo(unionid,sCallback){
    this.request({
      url: 'Smallwx/getEnrollInfo',
      data: {
        unionid: unionid
      },
      success: res => {
        sCallback(res);
        let summit = res.data.info[0].enroll_success; //峰会背景图
        let tmpBj = wx.getStorageSync('summit_bj'); //转换成本地图片路径后的地址
        //如果不存在则存
        if(!tmpBj){
          this._getBackImg(summit);
        } 
        //用户是否报名 data为true则已报名
        let data = res.data.user_enroll_info[0];
        let sign = data ? '1' : '0';
        wx.setStorageSync('sign', sign);
        if (sign == '1') {
          wx.setStorageSync('signName', data.truename);
        }

        let wsInfo = res.data.user_info[0];
        //用户是否完善名片信息
        let isWs = wsInfo.business_card;
        if (isWs == '1') {
          let tmpPic = wx.getStorageSync('pic');//峰会报名的用户头像 本地路径
          //如果本地路径不存在 则存
          if(!tmpPic){
            this._getImageInfo(wsInfo.largeAvatar);
          }
          // wx.setStorageSync('pic', wsInfo.largeAvatar);
          wx.setStorageSync('name', wsInfo.truename);
        }
      }
    })
  };
  _getBackImg(url) {
    let that = this;
    if (typeof url === 'string') {
      wx.getImageInfo({ //  小程序获取图片信息API
        src: url,
        success: function (res) {
          console.log(res);
          wx.setStorageSync('summit_bj', res.path);
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  };
  _getImageInfo(url) { //  图片缓存本地的方法
    let that = this;
    if (typeof url === 'string') {
      wx.getImageInfo({ //  小程序获取图片信息API
        src: url,
        success: function (res) {
          console.log(res);
          wx.setStorageSync('pic', res.path);
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  };
  //保存用户信息
  saveUserInfo(data,sCallback){
    this.request({
      url:'ApiUser/editBusinessCard',
      data:data,
      success:res=>{
        sCallback(res);
      }
    })
  };

  getNewRenMai(uid,sCallback){
    this.request({
      url:'ApiUser/myInfoMsg',
      data:{
        uid:uid
      },
      success:res=>{
        sCallback(res);
      }
    })
  }
}


export{
  UserInfoModel
}
