const api_base_url = "https://www.ruthout.com/";
// # 解构
class HTTP {
  request({ url, data = {}, method = 'POST' }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = 'POST') {
    wx.request({
      url: api_base_url + url,
      method: method,
      data: data,
      header: {
        'Accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        }
        else {
          reject()
        }
      },
      fail: (err) => {
        reject()
      }
    })

  }
}

export { HTTP }