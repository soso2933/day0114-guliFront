import request from '@/utils/request'
export default {

  createOrder(courseId) {
    /* 创建订单 */
    return request({
      url: `/eduorder/order/createOrder/${courseId}`,
      method: 'post'
    })
  },


  getOrderInfo(orderId){
    return request({
      url: `/eduorder/order//getOrderInfo/${orderId}`,
      method: 'get'
    })
  },

  createWxQrCode(orderId){
    return request({
      url:`/eduorder/paylog//createWxQrCode/${orderId}`,
      method:'get'
    })
  },

  getPayStatus(orderId){
    return request({
      url:`/eduorder/paylog/getPayStatus/${orderId}`,
      method:'get'
    })
  }

  
}