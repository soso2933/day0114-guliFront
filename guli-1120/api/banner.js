import request from '@/utils/request'
export default {
  getListBanner() {
    return request({
      url: `/educms/bannerfront/getAllBanner`,
      method: 'get'
    })
  },

  /* 后台上传banner的方法 */
}