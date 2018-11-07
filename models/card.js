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
}

export{
  CardDetails
}