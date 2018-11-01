const api_base_url = "https://www.ruthout.com/";
class HTTP {
  request(params){
    if (!params.method){
      params.method = "POST"
    }

    wx.request({
      url: api_base_url +params.url,
      method: params.method,
      data:params.data,
      header:{
        'Content-type': 'application/json'
      },
      success:res=>{
        console.log(res);
        params.success && params.success(res)
      },
      fail:error=>{
        console.log(error)
      }
    })
  }
}