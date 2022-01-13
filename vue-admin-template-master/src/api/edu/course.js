import request from '@/utils/request'

export default {
    //添加课程
    addSubjectInfo(courseInfo){
        return request({
            /* 
            url：后端接口的地址
             */
            //url: '/table/list/'+current+"/"+limit,
            url: '/eduservice/course/addCourseInfo',
            method: 'post',
            //data:表示把对象转换为json传入
            data:courseInfo
           
          })  
    },
    //查询所有讲师姓名，返回到下拉列表中，帮助选择；
    getTeacherList(){
      return request({
            url:'/eduservice/edu-teacher/findAll',
            method:'get'
      })
    },
    /* 
    根据指定id查询课程基本信息
     */
    getCourseInfoById(courseId){
      return request({
            url:'/eduservice/course/getCourseInfoById/'+courseId,
            method:'get'
      })
    },
    /* 
    根据指定id修改讲师信息
     */
    updateCourseInfo(courseInfoVo){
      return request({
            url:'/eduservice/course/updateCourseInfo',
            method:'post',
            data:courseInfoVo
      })
    },

    //获取最终的发布的确认的课程信息
    getPublishCourseInfo(courseId){
      return request({
        url:'/eduservice/course/getPublishCourseInfo/'+courseId,
        method:'get'
      })
    },

    //发布按钮修改课程status
    publishCourse(courseId){
      return request({
        url:'/eduservice/course/publishCourse/'+courseId,
        method:'post'
      })
    },

    //获取课程列表的方法
    getCourseList(){
      return request({
        url:'/eduservice/course/getCourseList',
        method:'get'
      })

    },

    deleteCourse(courseId){
      return request({
        url:'/eduservice/course/'+courseId,
        method:'delete'
      })
    }



   

    

    
    


    
}


//导入方的模板

/* export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
} */
