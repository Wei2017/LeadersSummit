import {
  HTTP
} from '../utils/http.js';

class HumanVein extends HTTP {
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
  }
}

export {
  HumanVein
}