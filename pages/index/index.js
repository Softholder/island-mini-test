import { Base64 } from 'js-base64'

Page({
  onGetToken(){
    // 获取code
    wx.login({
      success: (res) => {
        if(res.code){
          wx.request({
            url: 'http://localhost:3000/v1/token',
            method: 'POST',
            data: {
              account: res.code,
              type: 100
            },
            success: (res) => {
              console.log(res.data)
              const code = res.statusCode.toString()
              // 若返回码以2开头，则将token存入缓存
              if(code.startsWith('2')){
                wx.setStorageSync('token', res.data.token)
              }
            }
          })
        }
      }
    })
  },
  onVerifyToken(){
    wx.request({
      url: 'http://localhost:3000/v1/token/verify',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token')
        // token: '1234'
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  onGetLatest(){
    wx.request({
      url: 'http://localhost:3000/v1/classic/latest',
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      // HTTPBasicAuth在header中传递令牌
      // 令牌以account:password的base64加密格式传输
      // header格式 Authorization: Basic base64(account:password)
      header: {
        Authorization: this._encode()
      }
    })
  },

  _encode(){
    // account:password
    // token作为account，password为空
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ':')
    return 'Basic ' + base64
  }
})