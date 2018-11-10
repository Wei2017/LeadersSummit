import {
  HTTP
} from '../utils/http.js';

class HumanVein extends HTTP {
  //获取人脉列表
  getHumanVeinList(data, sCallback) {
    this.request({
      url: 'ApiUser/getRenMaiList',
      data: data,
      success: res => {
        sCallback(res);
      }
    })
  };

  //获取当前用户是否完善名片信息
  getCardState(unionid, sCallback) {
    this.request({
      url: 'Smallwx/getEnrollInfo',
      data: {
        unionid: unionid
      },
      success: res => {
        sCallback(res)
      }
    })
  };

  //发送交换名片请求
  exchangeCards(uid,pid,sCallback){
    this.request({
      url:'ApiUser/applyRenMai',
      data:{
        uid:uid,
        pid:pid
      },
      success:res=>{
        sCallback(res)
      }
    })
  };


  //处理人脉关系接口 2拒绝 3同意
  dealRenMai(uid,pid,state,sCallback){
    this.request({
      url:'ApiUser/dealRenMai',
      data:{
        uid:uid,
        pid:pid,
        state:state
      },
      success:res=>{
        sCallback(res);
      }
    })
  }
  

}

export {
  HumanVein
}