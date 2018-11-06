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
  }
}

export{
  CardDetails
}