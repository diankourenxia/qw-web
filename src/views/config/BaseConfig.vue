<template>
  <div>
    <el-alert title="修改信息后点击下方更新按钮进行保存" type="info">
    </el-alert>
    <el-form
      :rules="rules"
      ref="form"
      :inline="true"
      :model="userForm"
      label-width="80px"
      size="mini"
    >
      <el-form-item label="公司名称" style="width:40%" prop="name">
        <el-col :span="16">
          <el-input v-model="userForm.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="负责人" style="width:40%" prop="user">
        <el-col :span="16">
          <el-input v-model="userForm.user"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="微博名" style="width:40%" prop="weibo">
        <el-col :span="16">
          <el-input v-model="userForm.weibo"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="公司地址" style="width:40%" prop="address">
        <el-col :span="16">
          <el-input v-model="userForm.address"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="工作时间" style="width:40%" prop="timeRange">
        <el-col :span="16">
          <el-input v-model="userForm.timeRange"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="联系方式" style="width:40%" prop="timeRange">
        <el-col :span="16">
          <el-input v-model="userForm.phone"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="公司简介" style="width:100%" prop="describe">
        <el-col :span="16">
          <el-input v-model="userForm.describe" type="textarea"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item
        label="二维码"
        prop="qrCode"
        @click.native="chooseType('qrCode')"
      >
        <el-col :span="6">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="imgUploadFn"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="userForm.qrCode" :src="userForm.qrCode" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item label="logo" @click.native="chooseType('logo')">
        <el-col :span="6">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="imgUploadFn"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="userForm.logo" :src="userForm.logo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-form-item>
      <!-- <el-form-item label="背景图" @click.native="chooseType('bgImg')">
        <el-col :span="6">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="imgUploadFn"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="userForm.bgImg" :src="userForm.bgImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col> </el-form-item
      ><br /> -->
      <br />
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as configApi from "@api/config";
@Component({})
export default class BaseConfig extends Vue {
  $refs: any = {
    editDialog: HTMLElement
  };
  userForm = {
    name: "",
    describe: "",
    timeRange: "",
    qrCode: "",
    phone: "",
    address: "",
    weibo: "",
    logo: "",
    bgImg: "",
    user: ""
  };
  rules = {
    name: [{ required: true, message: "请输入公司名称", trigger: "change" }],
    describe: [
      { required: true, message: "请输入公司简介", trigger: "change" }
    ],
    timeRange: [
      { required: true, message: "请输入工作时间段", trigger: "change" }
    ],

    phone: [{ required: true, message: "请输入联系号码", trigger: "change" }],
    user: [{ required: true, message: "请输入负责人", trigger: "change" }],
    address: [{ required: true, message: "请输入地址", trigger: "change" }]
  };
  // 表头样式
  HEADER_CELL_STYLE = {
    "background-color": "#E6EEF5",
    color: "#303133"
  };
  imgType = "logo";
  onSubmit() {
    this.$refs.form.validate((valid: boolean) => {
      if (valid) {
        configApi.updateUserInfo(this.userForm).then(() => {
          this.$message.success("更新成功");
          this.queryUserInfo();
        });
      }
    });
  }
  created() {
    this.queryUserInfo();
  }
  handleAvatarSuccess(res: any, file: any) {
    this.userForm.qrCode = URL.createObjectURL(file.raw);
  }
  beforeAvatarUpload(file: any) {
    const isJPG = file.type === "image/jpeg" || file.type === "image/png";
    const isLt = file.size / 1024 < 300;

    if (!isJPG) {
      this.$message.error("上传图片只能是 JPG/PNG 格式!");
    }
    if (!isLt) {
      this.$message.error("上传图片大小不能超过 300kb!");
    }
    return isJPG && isLt;
  }
  chooseType(type: string) {
    this.imgType = type;
  }
  queryUserInfo() {
    let param = {};
    configApi.getUserInfo(param).then(res => {
      this.userForm = res[0];
    });
  }
  imgUploadFn(content: any) {
    const formData = new FormData();
    formData.append("file", content.file);
    configApi
      .uploadImg(formData)
      .then((res: any) => {
        // this.getIndex(content.file.uid);
        //@ts-ignore
        this.userForm[this.imgType] = res;
        //@ts-ignore
        // this.$set(this.imgUpload, "src", res);
      })
      .catch((err: any) => {
        this.$alert(err.msg);
      });
  }
}
</script>
<style lang="stylus">
.avatar-uploader .el-upload
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden
.avatar-uploader .el-upload:hover
  border-color #409EFF
.avatar-uploader-icon
  font-size 28px
  color #8c939d
  width 99px
  height 99px
  line-height 99px
  text-align center
.avatar
  width 99px
  height 99px
  display block
.el-form-item__label
  text-align left
</style>
