import {HTTP} from '../utils/http.js';

class UserInfoModal extends HTTP{
  getUserInfo(unionid,sCallback){
    this.request({
      url: 'Smallwx/getEnrollInfo',
      data: {
        unionid: unionid
      },
      success: res => {
        sCallback(res);
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
  }
}


export{
  UserInfoModal
}
