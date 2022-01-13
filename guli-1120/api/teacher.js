import request from '@/utils/request'
export default {

  getFrontTeacherList(page,limit) {
    /* 查询热门课程和名师 */
    return request({
      url: `/eduservice/teacherfront/getFrontTeacherList/${page}/${limit}`,
      method: 'post'
    })
  },


  getTeacherInfo(teacherId){
    return request({
      url: `/eduservice/teacherfront//getTeacherFrontInfo/${teacherId}`,
      method: 'get'
    })
  }

  
}