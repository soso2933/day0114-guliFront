<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>

      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          min="0"
        />
      </el-form-item>

      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>

      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>

      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换头像
        </el-button>

        <!-- 
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API + '/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from "@/api/edu/teacher";
import ImageCropper from '@/components/ImageCropper';
import PanThumb from '@/components/PanThumb';
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      //定义变量和初始值
      /* list:null,//查询之后接口返回集合
              page:1,//当前页
              limit:3,//每页记录数
              total:0,//总记录数
              teacherQuery:{} //条件封装对象 */

      teacher: {
        name: "",
        sort: 0,
        level: 1,
        career: "",
        intro: "",
        avatar: "https://edu-2933.oss-cn-beijing.aliyuncs.com/IMG_0098.JPG",//默认头像
      },
      imagecropperShow:false,
      imagecropperKey:0,
      BASE_API:process.env.BASE_API,
      saveBtnDisabled: false,
    };
  },
  created() {
    this.init();
  },
  //路由有变化 就初始化
  watch: {
    $route(to, from) {
      console.log("watch $route");
      this.init();
    },
  },
  methods: {
    close(){
      //关闭上传弹框的方法
      this.imagecropperShow=false
      this.imagecropperKey=this.imagecropperKey+1
    },
    cropSuccess(data){
      //上传成功的方法
      this.imagecropperShow=false
      this.teacher.avatar=data.url
      this.imagecropperKey=this.imagecropperKey+1

    },

    init() {
      //页面渲染之前执行 判断路径中是否有id值
      //params 和parames
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.getTeacherInfo(id);
      } else {
        this.teacher = {};
      }
    },

    //根据讲师id完整回填表单数据
    getTeacherInfo(id) {
      teacherApi.getTeacherInfo(id).then((response) => {
        this.teacher = response.data.teacher;
      });
    },
    saveOrUpdate() {
      //保存或更新修改
      //判断是修改还是添加
      if (this.teacher.id) {
        this.updateTeacher();
      } else this.saveTeacher();
    },

    //修改讲师
    updateTeacher() {
      teacherApi.updateTeacherInfo(this.teacher).then((response) => {
        //提示信息
        this.$message({
          type: "success",
          message: "修改讲师信息成功!",
        });
        //回到查询页面 显示添加的最新讲师详情
        this.$router.push({ path: "/teacher/table" });
      });
    },

    saveTeacher() {
      //添加讲师
      /* this.teacher={} */
      teacherApi
        .addTeacher(this.teacher)
        .then((response) => {
          //添加成功
          //提示信息
          this.$message({
            type: "success",
            message: "添加成功成功!",
          });
          //回到查询页面 显示添加的最新讲师详情
          this.$router.push({ path: "/teacher/table" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加",
          });
        });
    },
  },
};
</script>