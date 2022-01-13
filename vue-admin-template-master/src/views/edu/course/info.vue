<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

  <el-form label-width="120px">

  <el-form-item label="课程标题">
    <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
  </el-form-item>

  <!-- 课程分类 一级分类-->

  <el-form-item label="课程分类">
      <el-select
        v-model="courseInfo.subjectParentId"
        placeholder="一级分类" @change="getSecondSubject">
        <el-option
            v-for="subject in subjectPrimaryList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
            
      </el-select>
 

  <!-- 课程分类 二级分类-->
        <el-select
        v-model="courseInfo.subjectId"
        placeholder="二级分类" id="secondSubject">
        <el-option
            v-for="subject in subjectSecondList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
            
      </el-select>
  </el-form-item>

  <!-- 课程讲师 -->
    <el-form-item label="课程讲师">
      <el-select
        v-model="courseInfo.teacherId"
        placeholder="请选择">
        <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
      </el-select>
  </el-form-item>

  <el-form-item label="总课时">
    <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
  </el-form-item>

  <!-- 课程简介 TODO -->
  <!-- 课程简介-->
<el-form-item label="课程简介">
    <tinymce :height="300" v-model="courseInfo.description"/>
</el-form-item>

  <!-- 课程封面 Did -->
  <!-- 课程封面-->
<el-form-item label="课程封面">

  <el-upload
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :action="BASE_API+'/eduoss/fileoss'"
    class="avatar-uploader">
    <img :src="courseInfo.cover">
  </el-upload>

</el-form-item>

  <el-form-item label="课程价格">
    <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
  </el-form-item>

  <el-form-item>
    <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
  </el-form-item>

</el-form>

  </div>
</template>


<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce'
    export default{
      components: { Tinymce },
        data(){
            return{
                saveBtnDisabled:false,
                courseInfo:{
                    title: '',
                    subjectId: '',//二级分类id
                    subjectParentId:'',//一级分类id
                    teacherId: '',
                    lessonNum: 0,
                    description: '',
                    cover: 'https://edu-2933.oss-cn-beijing.aliyuncs.com/01.jpeg',
                    price: 0
                },
                courseId:'',
                BASE_API: process.env.BASE_API,// 接口API地址
                OSS_PATH: process.env.OSS_PATH,
                teacherList:[],//封装所有讲师的数据
                subjectPrimaryList:[],//封装课程的一级分类
                subjectSecondList:[],//封装课程的二级级分类

            }
        },
        created(){
            this.init()
           
        },

        //路由有变化 就初始化
        watch: {
        $route(to, from) {
          console.log("watch $route");
          this.init();
          },
        },
        methods:{
          //页面渲染之前执行 判断路径中是否有id值
          //params 和parames
            init(){
               //获取路由中的courseId值
            if(this.$route.params && this.$route.params.id){
                  this.courseId=this.$route.params.id,
                  this.getCourseInfo(),
                  this.getTeacherList()
                
            }else{
                 //初始化所有讲师
                  this.courseInfo={},
                  this.courseInfo.description= '',
                  this.courseInfo.cover='https://edu-2933.oss-cn-beijing.aliyuncs.com/01.jpeg',
                  this.getTeacherList(),
                  this.getPrimarySubject()
            }
           
            },
            //获取指定id的课程信息
            getCourseInfo(){
              course.getCourseInfoById(this.courseId)
                .then(response =>{
                  //查询到的信息包含一级和二级分类
                  this.courseInfo=response.data.courseInfoVo,
                  //查询所有的分类，包括一级和二级
                  subject.getSubjectList()
                    .then(response =>{
                      //获取所有的一级分类
                      this.subjectPrimaryList=response.data.list
                      //遍历一级分类数组 与当前courseInfo中一级分类的id比较
                      for(var i=0;i<this.subjectPrimaryList.length;i++){
                        var primarySubject =this.subjectPrimaryList[i]
                        //做比较
                        if( this.courseInfo.subjectParentId==primarySubject.id){
                          this.subjectSecondList=primarySubject.children
                        }

                      }
                    })

                })
            },
            //上传头像成功的方法
            handleAvatarSuccess(res,file){
                this.courseInfo.cover = res.data.url
            },
            //上传头像之前的方法
            beforeAvatarUpload(file){
              const isJPG = file.type === 'image/jpeg'
              const isLt2M = file.size / 1024 / 1024 < 8
            if (!isJPG) {
                  this.$message.error('上传头像图片只能是 JPG 格式!')
                }
            if (!isLt2M) {
                  this.$message.error('上传头像图片大小不能超过 8MB!')
                }
                  return isJPG && isLt2M
            },

            //添加课程
            addCourse(){
                course.addSubjectInfo(this.courseInfo)
                .then(response =>{
                  //提示信息
                  this.$message({
                    type: 'success',
                    message: '添加课程成功!',
                    });
                  //跳转到第二步
                  this.$router.push({path:'/course/chapter/'+response.data.courseId})
                })
            },

            //修改课程
            updateCourse(){
              course.updateCourseInfo(this.courseInfo)
                .then(response =>{
                  //提示信息
                  this.$message({
                    type: 'success',
                    message: '修改课程成功!',
                    });
                  //跳转到第二步
                  this.$router.push({path:'/course/chapter/'+this.courseId})
                })
            },
            //保存或者更新课程
            saveOrUpdate(){
                //判断是添加还是修改
                if(this.courseInfo.id){
                    //有id值就是修改
                    this.updateCourse()
                }else{
                  this.addCourse()
                }
                
            },


            //获取所有讲师的信息 返回到下拉列表中
            getTeacherList(){
                course.getTeacherList()
                .then(response =>{
                      this.teacherList=response.data.items
                })
            },

            //获取所有的一级分类课程名字
            getPrimarySubject(){
              subject.getSubjectList()
              .then(response =>{
                  this.subjectPrimaryList=response.data.list
              })
            },

            //获取所有的二级分类课程名字
            getSecondSubject(value){
              
              //遍历所有分类 包含所有的一级和二级分类
              for(var i=0;i<this.subjectPrimaryList.length;i++){
                var subjectPrimary=this.subjectPrimaryList[i];
                if(value===subjectPrimary.id){
                  this.subjectSecondList=subjectPrimary.children
                  this.courseInfo.subjectId=''
            
                }
              }
            }



        }
    }
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>
