import request from '@/utils/request'

export default {
    //====================以下是关于小节video的所有js操作==============================
    //添加小节
    addVideo(video){
        return request({
            
            url: '/eduservice/video/addVideo',
            method: 'post',
            data:video
            //data:表示把对象转换为json传入
        })  
    },

    /* 根据指定小节id查询小节数据*/
    getVideoInfoById(videoId){
        return request({
            
            url: '/eduservice/video/getVideoInfo/'+videoId,
            method: 'get',
            //data:表示把对象转换为json传入
            
           
          })  
    },
    updateVideo(video){
        /* //修改小节信息根据指定章节id */
        return request({
            url: '/eduservice/video/updateVideo',
            method: 'post',
            data:video
            //data:表示把对象转换为json传入
            
        })  
    },
    
    deleteVideo(id){
        /* //删除小节 */
        return request({
            url: '/eduservice/video/'+id,
            method: 'delete',
            //data:表示把对象转换为json传入
      })  
    },

    //根据视频id删除视频
    deleteVideoById(vid){
        return request({
            
            url: '/eduvod/video/deleteVod/'+vid,
            method: 'delete',
           
            //data:表示把对象转换为json传入
            
           
          })  
    },
}