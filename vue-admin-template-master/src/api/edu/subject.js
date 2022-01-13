import request from '@/utils/request'

export default {
    //获取课程分类列表
    getSubjectList(){
        return request({
            /* 
            url：后端接口的地址
             */
            //url: '/table/list/'+current+"/"+limit,
            url: '/eduservice/subject/getAllSubject',
            method: 'get',
            //data:表示把对象转换为json传入
           
          })  
    },
   

    

    
    


    
}


//导入方的模板

/* export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
} */
