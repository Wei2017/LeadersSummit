import {
  ConsultModal
} from '../../../models/consult.js';
const consultModal = new ConsultModal();
const util = require('../../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bigId: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    consult: ['个人咨询', '企业咨询'],
    consultIndex: 0,
    consultChecked: '个人咨询',
    consultPhone: '',
    consultCon: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 咨询类型选择
    bindConsultChange: function(e) {
      console.log('咨询类型为：', this.data.consult[e.detail.value])
      this.setData({
        consultChecked: this.data.consult[e.detail.value],
        consultIndex: e.detail.value
      })
    },

    getPhone: function(e) {
      this.setData({
        consultPhone: e.detail.value
      })
    },
    getContent: function(e) {
      this.setData({
        consultCon: e.detail.value
      })
    },


    //保存预约信息
    submitMakeInfo: function(e) {
      if (this.data.consultPhone == '') {
        util.showTotal('请输入手机号码!');
      } else if (!this._checkPhone(this.data.consultPhone)) {
        util.showTotal('请输入正确的手机号码!');
      } else if (this.data.consultCon == ''){
        util.showTotal('请输入问题描述!');
      }else {
        let that = this,
          data = {
            user_id: wx.getStorageSync('user_id'),
            big_id: that.data.bigId,
            content: that.data.consultCon,
            mobile: that.data.consultPhone,
            type: that.data.consultChecked == '个人咨询' ? '1' : '2'
          }
        consultModal.makeConsult(data, res => {
          if(res.code == 1){
            wx.showToast({
              title: '提交成功，请等待',
              duration:3000,
              success:res=>{
                wx.reLaunch({
                  url: '/pages/big_shot/big_shot'
                })
              }
            })
          }
        })
      }

    },
    //正则验证手机号
    _checkPhone: function(phone) {
      var ruler = /^(1([3456789][0-9]))\d{8}$/;
      return ruler.test(phone);
    }
  }
})