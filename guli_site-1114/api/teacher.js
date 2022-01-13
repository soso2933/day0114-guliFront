import request from '~/utils/request'

export default{

  getList() {
    return request({
      url: '/api/edu/teacher/list',
      method: 'get'
    })
  }
}