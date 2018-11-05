import {HTTP} from '../utils/http.js';

class BigshotModal extends HTTP{
  // 获取大咖列表
  getBigShotList(data,sCallback){
    this.request({
      url:'Smallwx/getBigShotList',
      data:data,
      success:res=>{
        sCallback(res);
      }
    })
  }
}

export{
  BigshotModal
}