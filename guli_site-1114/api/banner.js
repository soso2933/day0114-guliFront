import request from '@/utils/request'
export default {
  getListBanner() {
    return request({
      url: '/cmsedu/banner/getAllBanner',
      method: 'get'
    })
  }
}