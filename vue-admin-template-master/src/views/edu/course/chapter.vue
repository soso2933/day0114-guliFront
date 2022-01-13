<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>

    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>
    <el-button type="text" @click="openChapterDialog">添加章节</el-button>

    <!-- 章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <p>
          {{ chapter.title }}

          <span class="acts">
            <el-button type="text" @click="openVideoAddDialog(chapter.id)"
              >添加小节</el-button
            >
            <el-button
              style=""
              type="text"
              @click="openChapterEditDialog(chapter.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="removeChapter(chapter.id)"
              >删除</el-button
            >
          </span>
        </p>

        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button type="text" @click="openVideoEditDialog(video.id)">编辑</el-button>
                <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
        >下一步</el-button
      >
    </div>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number
            v-model="chapter.sort"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改小节表单 也就是video -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>

        <el-form-item label="课时排序">
          <el-input-number
            v-model="video.sort"
            :min="0"
            controls-position="right"
          />
        </el-form-item>

        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="上传视频">
              <el-upload
                    :on-success="handleVodUploadSuccess"
                    :on-remove="handleVodRemove"
                    :before-remove="beforeVodRemove"
                    :on-exceed="handleUploadExceed"
                    :file-list="fileList"
                    :action="BASE_API+'/eduvod/video/uploadAlyVideo'"
                    :limit="1"
                    class="upload-demo">
              <el-button size="small" type="primary">上传视频</el-button>

              <el-tooltip placement="right-end">
                  <div slot="content">最大支持1G，<br>
                      支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                      GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                      MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                      SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
                  <i class="el-icon-question"/>
              </el-tooltip>

              </el-upload>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button
          :disabled="saveVideoBtnDisabled"
          type="primary"
          @click="saveOrUpdateVideo"
          >确 定</el-button
        >
      </div>
    </el-dialog>

  </div>
</template>


<script>
import chapter from "@/api/edu/chapter";
import video from "@/api/edu/video";
export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      saveVideoBtnDisabled:false,
      chapterVideoList: [],
      courseId: "", //课程id
      dialogChapterFormVisible: false, //章节的弹框
      dialogVideoFormVisible: false, //小节的弹框
      fileList: [],//上传文件列表
      BASE_API: process.env.BASE_API, // 接口API地址
      chapter: {
        title: "",
        sort: 0,
      }, //用于封装chapter数据
      video: {
        title: "",
        sort: 0,
        free: 0,
        videoSourceId: "",
        videoOriginalName: ""
      }, //用于封装video数据
    };
  },

  created() {
    if (this.$route.params && this.$route.params.id) {
      /* 获取路由中课程id值
      并且刷新页面信息 */
      this.courseId = this.$route.params.id, 
      this.getChapterVideo();
    }
  },

  

  methods: {
     
      handleVodUploadSuccess(response, file, fileList) {
        /* //成功回调 */
        //上传之后的视频id赋值
        this.video.videoSourceId = response.data.vid,
        this.video.videoOriginalName=file.name
      },
      //视图上传多于一个视频
      handleUploadExceed(files, fileList) {
        this.$message.warning('想要重新上传视频，请先删除已上传的视频')
      },

      beforeVodRemove(file,fileList){
            /* 点击x之后的方法 */
            return this.$confirm(`确定移除 ${file.name}？`)
      },

      handleVodRemove(){
          /* 点击确定之后的方法 调用接口 删除阿里云视频方法*/
          video.deleteVideoById(this.video.videoSourceId)
            .then(response =>{

              this.$message({
            type: "success",
            message: "删除视频成功!",
          }),
          //把文件列表情况
          this.fileList= []
            }),
          this.video.videoSourceId = "",
          this.video.videoOriginalName=""
      },
    //==============================小节操作===================================
   
    openVideoAddDialog(chapterId) {
      /* 添加小节弹框的方法 */
      this.dialogVideoFormVisible=true,
      //先清空添加小节的表单
      this.video={},
      //设置小节的章节id
      this.video.chapterId=chapterId
    },

    openVideoEditDialog(videoId){
      /* 小节编辑按钮 回显编辑的方法 */
      this.dialogVideoFormVisible = true;
      video.getVideoInfoById(videoId).then((response) => {
        this.video = response.data.video;
      });
    },

    saveOrUpdateVideo(){
      /* saveOrUpdateVideo 保存或者修改章节信息
      先进行videoId路由中有无的判断 选择调用添加还是修改
     */
      if (this.video.id) {
        this.updateVideo();
      } else {
        this.addVideo();
      }
    },

    addVideo(){
      //设置小节的课程id
      this.video.courseId=this.courseId
      video.addVideo(this.video)
        .then(response =>{
            //1.关闭弹窗
          this.dialogVideoFormVisible = false;
          //2.提示信息
          this.$message({
            type: "success",
            message: "添加小节成功!",
          }),
            //3.刷新页面
            this.getChapterVideo();
        })
    },

    updateVideo(){
      /* updateVideo编辑小节信息 */
      video.updateVideo(this.video).then((response) => {
        //1.关闭弹窗
        this.dialogVideoFormVisible = false;
        //2.提示信息
        this.$message({
          type: "success",
          message: "编辑小节信息成功!",
        }),
          //3.刷新页面
          this.getChapterVideo();
      });
    },

    removeVideo(videoId) {
      /* 根据指定小节id删除该该小节的信息 删除之前先进行删除的二次弹框确认 */
      this.$confirm("此操作将永久删除小节记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          video
            .deleteVideo(videoId)
            .then((response) => {
              //提示删除成功 友好提示 二次确认
              this.$message({
                type: "success",
                message: "您已经成功删除该小节",
              });
              //回到刷新列表页面
              this.getChapterVideo();
            })
            .catch((error) => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已经取消删除",
          });
        });
    },



    //==============================章节操作===================================
    openChapterDialog() {
      /* 添加章节信息的弹框 */
      //弹框
      (this.dialogChapterFormVisible = true),
        //清空弹框的表单信息
        (this.chapter.title = ""),
        (this.chapter.sort = 0);
    },


    openChapterEditDialog(chapterId) {
      /* openChapterEditDialog 章节编辑按钮的功能
       回显章节信息 编辑 */
      this.dialogChapterFormVisible = true;
      chapter.getChapterInfo(chapterId).then((response) => {
        this.chapter = response.data.chapter;
      });
    },

    removeChapter(chapterId) {
      /* 根据指定章节id删除该章节的信息 删除之前先进行删除的二次弹框确认 */
      this.$confirm("此操作将永久删除章节记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          chapter
            .deleteChapter(chapterId)
            .then((response) => {
              //提示删除成功 友好提示 二次确认
              this.$message({
                type: "success",
                message: response.data.msg,
              });
              //回到刷新列表页面
              this.getChapterVideo();
            })
            .catch((error) => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已经取消删除",
          });
        });
    },

    

    addChapter() {
      /* 设置课程id courseId到chapter对象中去 */
      (this.chapter.courseId = this.courseId),
        chapter.addChapter(this.chapter).then((response) => {
          //1.关闭弹窗
          this.dialogChapterFormVisible = false;
          //2.提示信息
          this.$message({
            type: "success",
            message: "添加章节成功!",
          }),
            //3.刷新页面
            this.getChapterVideo();
        });
    },

    updateChapter() {
      /* updateChapter修改章节信息 */
      chapter.updateChapter(this.chapter).then((response) => {
        //1.关闭弹窗
        this.dialogChapterFormVisible = false;
        //2.提示信息
        this.$message({
          type: "success",
          message: "修改章节成功!",
        }),
          //3.刷新页面
          this.getChapterVideo();
      });
    },

    saveOrUpdate() {
      /* saveOrUpdate 保存或者修改章节信息
      先进行chapterId路由中有无的判断 选择调用添加还是修改
     */
      if (this.chapter.id) {
        this.updateChapter();
      } else {
        this.addChapter();
      }
    },

    getChapterInfo() {
      //根据章节chapterId查询章节信息
      chapter.getChapterInfo(this.chapter.id).then((response) => {
        this.chapter = response.data.chapter;
      });
    },

    getChapterVideo() {
      /* getChapterVideo根据课程id查询所属章节和小节列表 */
      chapter.getChapterVideoById(this.courseId).then((response) => {
        this.chapterVideoList = response.data.allChapterVideo;
      });
    },
    previous() {
      console.log("previous");
      this.$router.push({ path: "/course/info/" + this.courseId });
    },

    next() {
      console.log("next");
      this.$router.push({ path: "/course/publish/" + this.courseId });
    },
  },
};
</script>



//
<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>