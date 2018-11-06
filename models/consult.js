import {
  HTTP
} from '../utils/http.js';

class ConsultModal extends HTTP {
  makeConsult(data,sCallback) {
    this.request({
      url:'Smallwx/makeBigShot',
      data:data,
      success:res=>{
        sCallback(res);
      }
    })
  };

  getBigShotInfo(bid,sCallback){
    this.request({
      url: '',
      data: bid,
      success: res => {
        sCallback(res);
      }
    })
  }
}

export{
  ConsultModal
}