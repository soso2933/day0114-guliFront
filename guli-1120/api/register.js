import request from '@/utils/request'

export default {
  //根据手机号码发送短信
  getMobileCode(telNo) {
    return request({
      url: `/edumsm/msm/send/${telNo}`,
      method: 'get'
    })
  },
  //用户注册
  submitRegister(formItem) {
    return request({
      url: `/ucenter/member/register`,
      method: 'post',
      data: formItem
    })
  }
}