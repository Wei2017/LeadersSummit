import {HTTP} from '../utils/http.js';

class MyMakeModel extends HTTP{
  getMyMakeList(uid,sCallback){
    this.request({
      url:'Smallwx/myMakeShotList',
      data:{
        user_id:uid
      },
      success:res=>{
        sCallback(res);
      }
    })
  }
}

export{
  MyMakeModel
}