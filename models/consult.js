import {
  HTTP
} from '../utils/http.js';

class ConsultModal extends HTTP {
  makeConsult(par,sCallback) {
    this.request({
      url:'Smallwx/makeBigShot',
      data:{
        user_id: par.uid,
        big_id:par.bid,
        content:par.content,
        mobile:par.phone,
        type:par.type
      },
      success:res=>{
        sCallback(res);
      }
    })
  }
}

export{
  ConsultModal
}