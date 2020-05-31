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
        // token: wx.getStorageSync('token')
        token: '1234'
      },
      success: res => {
        console.log(res.data)
      }
    })
  }
})