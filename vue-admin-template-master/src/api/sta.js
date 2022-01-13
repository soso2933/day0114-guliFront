import request from '@/utils/request'

export default {
    
    registerCount(day){
        return request({
            /* 
            url：后端接口的地址
             */
            //url: '/table/list/'+current+"/"+limit,
            url: `/servicesta/statistics/registerCount/${day}`,
            method: 'get',
            //data:表示把对象转换为json传入
            data:day
           
          })  
    },

    getShowDataSta(searchObj){
        return request({
           
            url: `/servicesta/statistics/showData/${searchObj.factor}/${searchObj.begin}/${searchObj.end}`,
            method: 'get',
            //data:表示把对象转换为json传入
            data:searchObj
           
          })  
    }
}    
