import {HTTP} from '../utils/http.js';

class CardDetails extends HTTP{

  //跳转人脉详情页面
  getCardDetails(bid, uid, sCallback) {
    this.request({
      url: 'ApiUser/viewOneRenMaiInfo',
      data: {
        uid: uid,
        pid: bid
      },
      success: res => {
        sCallback(res)
      }
    })
  };

  //人脉列表
  getHumanVeinList(data, sCallback) {
    this.request({
      url: 'ApiUser/getRenMaiList',
      data: data,
      success: res => {
        sCallback(res);
      }
    })
  };

  //发送交换名片请求
  exchangeCards(uid, pid, sCallback) {
    this.request({
      url: 'ApiUser/applyRenMai',
      data: {
        uid: uid,
        pid: pid
      },
      success: res => {
        sCallback(res)
      }
    })
  };

  //处理人脉关系接口 2拒绝 3同意
  dealRenMai(uid, pid, state, sCallback) {
    this.request({
      url: 'ApiUser/dealRenMai',
      data: {
        uid: uid,
        pid: pid,
        state: state
      },
      success: res => {
        sCallback(res);
      }
    })
  }
}

export{
  CardDetails
}