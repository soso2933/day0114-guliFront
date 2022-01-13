<template>

  <div>
    <!-- 幻灯片 开始 -->
      <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
              <div v-for="banner in bannerList" :key="banner.id" class="swiper-slide" style="background: #040B1B;">
                  <a target="_blank" :href="banner.linkUrl">
                    <img width="100%"
                      :src="banner.imageUrl"
                      :alt="banner.title"/>
                  </a>
              </div>
      
          </div>
          <div class="swiper-pagination swiper-pagination-white"></div>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </div>
      <!-- 幻灯片 结束 -->

   

    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div>
        
          </div>
      </div>
      <!-- /网校课程 结束 -->

      <!-- 网校名师 开始 -->
      <div>
        
      </div>
      <!-- /网校名师 结束 -->


  </div>
  
</template>

<script>
import banner from "@/api/banner"

export default {
  data () {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: '.swiper-pagination'//分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: '.swiper-button-next',//下一页dom节点
          prevEl: '.swiper-button-prev'//前一页dom节点
        }
      },
      bannerList: {}
    }
  },
  created() {
    this.initDataBanner()
  },
  methods:{
    initDataBanner() {
      banner.getListBanner().then(response => {
        response.header("Access-Control-Allow-Origin","*")
        this.bannerList = response.data.data.list
      })
    }
  }
}
</script>