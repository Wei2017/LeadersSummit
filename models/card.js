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

  //获取为您推荐人脉列表
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
  }
}

export{
  CardDetails
}