import {
  HTTP
} from '../../utils/http.js';

class UtilModal extends HTTP {

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

export{
  UtilModal
}