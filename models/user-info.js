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
        wx.setStorageSync('summit_bj', summit);
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
          wx.setStorageSync('pic', wsInfo.largeAvatar);
          wx.setStorageSync('name', wsInfo.truename);
        }
      }
    })
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
