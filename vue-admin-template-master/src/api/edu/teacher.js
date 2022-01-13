import request from '@/utils/request'

export default {
    //方法1 讲师列表<分页条件查询>
    getTeacherList(current,limit,teacherQuery){
        return request({
            /* 
            url：后端接口的地址
             */
            //url: '/table/list/'+current+"/"+limit,
            url: `/eduservice/edu-teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //data:表示把对象转换为json传入
            data:teacherQuery
          })  
    },
    //删除讲师
    deleteTeacherById(id){
      return request({
        /* 
        url：后端接口的地址
         */
        //url: '/table/list/'+current+"/"+limit,
        url: `/eduservice/edu-teacher/${id}`,
        method: 'delete',
        //data:表示把对象转换为json传入
      
      })  
    },

    //添加讲师
    addTeacher(teacher){
      return request({
        /* 
        url：后端接口的地址
         */
        //url: '/table/list/'+current+"/"+limit,
        url: `/eduservice/edu-teacher/addTeacher`,
        method: 'post',
        //data:表示把对象转换为json传入
        data:teacher
      })  
    },

    //根据讲师id查询数据信息回显
    getTeacherInfo(id){
      return request({

        url:`/eduservice/edu-teacher/getTeacher/${id}`,
        method:'get'

      })

    },

    //修改讲师信息
    updateTeacherInfo(teacher){
      return request({

        url:`/eduservice/edu-teacher/updateTeacher`,
        method:'post',
        data:teacher

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
