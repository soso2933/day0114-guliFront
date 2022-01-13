import request from '@/utils/request'

export default {
   

    //====================以下是关于章节chapter的所有js操作============================
    //查询指定课程的章节和小节
    getChapterVideoById(courseId){
        return request({
            
            url: '/eduservice/chapter/getChapterVideo/'+courseId,
            method: 'get',
            //data:表示把对象转换为json传入
            
           
          })  
    },
    //添加章节
    addChapter(chapter){
        return request({
            
            url: '/eduservice/chapter/addChapter',
            method: 'post',
            data:chapter
            //data:表示把对象转换为json传入
            
           
          })  
    },

    


    //根据章节chapterId查询章节信息
    getChapterInfo(chapterId){
        return request({
            
            url: '/eduservice/chapter/getChapterInfo/'+chapterId,
            method: 'get',
            
            //data:表示把对象转换为json传入
            
           
          })  
    },

    //修改章节信息根据指定章节id
    updateChapter(chapter){
        return request({
            
            url: '/eduservice/chapter/updateChapter',
            method: 'post',
            data:chapter
            //data:表示把对象转换为json传入
            
        })  
    },

    //删除章节信息
    deleteChapter(chapterId){
        return request({
            
            url: '/eduservice/chapter/'+chapterId,
            method: 'delete',
           
            //data:表示把对象转换为json传入
            
           
          })  
    },

    
}