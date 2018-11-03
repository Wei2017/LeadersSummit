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
        'Accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:res=>{
        params.success && params.success(res.data)
      },
      fail:error=>{
        console.log(error)
      }
    })
  }
}

export{
  HTTP
}