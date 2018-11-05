import {HTTP} from '../utils/http.js';

class UserInfoModal extends HTTP{
  getUserInfo(sCallback){
    this.request({
      url:'',

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
