import {
  HTTP
} from '../utils/http.js';

class ConsultModal extends HTTP {
  //预约大咖
  makeConsult(data,sCallback) {
    this.request({
      url:'Smallwx/makeBigShot',
      data:data,
      success:res=>{
        sCallback(res);
      }
    })
  };


  //获取大咖信息
  getBigShotInfo(bid,sCallback){
    this.request({
      url: 'Smallwx/bigShotDetail',
      data: {
        big_id:bid
      },
      success: res => {
        sCallback(res);
      }
    })
  };

  //获取预约咨询详情信息
  getConsultDetails(mid,sCallback){
    this.request({
      url: 'Smallwx/myMakeShotDetail',
      data: {
        make_id: mid
      },
      success: res => {
        sCallback(res);
      }
    })
  }
}

export{
  ConsultModal
}