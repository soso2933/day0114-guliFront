import request from '@/utils/request'

export default{
    addBanner(bannerInfo){
        return request({
            url:'/educms/banneradmin/addBanner',
            method:'post',
            data:bannerInfo
        })
    }
}