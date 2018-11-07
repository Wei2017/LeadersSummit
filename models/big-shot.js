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
  };

  //获取大咖或嘉宾详情信息 显示弹框
  getBshotOrGuestDetails(uid,bid,sCallback){
    this.request({
      url:'Smallwx/bigShotDetail',
      data:{
        user_id:uid,
        big_id:bid
      },
      success:res=>{
        sCallback(res)
      }
    })
  }
}

export{
  BigshotModal
}