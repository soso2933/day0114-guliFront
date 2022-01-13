import request from '@/utils/request'
export default {

  getFrontCourseList(page,limit,searchObj) {
    /* 查询热门课程和名师 */
    return request({
      url: `/eduservice/frontcourse/getFrontCourseList/${page}/${limit}`,
      method: 'post',
      data:searchObj
    })
  },

  /* 查询所有分类 */
  getAllSubject(){
    return request({
      url: `/eduservice/subject//getAllSubject`,
      method: 'get'
    })
  },

  getCourseInfo(courseId){
    return request({
      url: `/eduservice/frontcourse/getFrontCourseInfo/${courseId}`,
      method: 'get'
    })
  },

  isBuyCourse(){

  }

  
}