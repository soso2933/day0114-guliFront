import request from '@/utils/request'
export default {

  getIndexData() {
    /* 查询热门课程和名师 */
    return request({
      url: `/eduservice/indexfront/index`,
      method: 'get'
    })
  },

  
}