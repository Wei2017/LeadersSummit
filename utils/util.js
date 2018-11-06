import {HTTP} from './http.js';
const http = new HTTP();
// 设置顶部导航条背景颜色
const setnavBarBjColor = ()=>{
  wx.setNavigationBarColor({
    frontColor: '#ffffff',
    backgroundColor: '#ecb700'
  })
}

//showTotal功能提示框
const showTotal = title=>{
  wx.showToast({
    title: title,
    mask: true,
    icon: 'none'
  })
}


module.exports = {
  setnavBarBjColor: setnavBarBjColor,
  showTotal: showTotal
}

