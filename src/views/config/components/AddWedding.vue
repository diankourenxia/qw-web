<template>
  <div class="addOrder-container">
    <el-dialog
      width="80%"
      title="增加案例"
      :visible.sync="addDialogVisible"
      @close="handleClose"
      top="1vh"
      style="min-width:900px;height: 90vh;overflow:hidden;margin-top:5vh;max-height:715px"
    >
      <el-row class="add-order-models">
        <el-row class="title-part">
          <span>基本信息</span>
        </el-row>
        <el-row type="flex" justify="center" class="models-container">
          <el-col :span="14" class="models-part">
            <el-form
              :model="getterDetailForm"
              style="top:0;right: 0; padding: 10px;padding-top:15px"
              ref="getterDetailForm"
              :rules="getterDetailFormRules"
            >
              <el-row>
                <el-col :span="16">
                  <el-form-item label="名称" label-width="80px" prop="title">
                    <el-input
                      v-model="getterDetailForm.title"
                      auto-complete="off"
                      maxlength="20"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="价格" label-width="80px" prop="price">
                    <el-input
                      v-model="getterDetailForm.price"
                      auto-complete="off"
                      maxlength="20"
                      type="number"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item
                    label="酒店"
                    label-width="80px"
                    prop="consignee"
                  >
                    <el-input
                      v-model="getterDetailForm.hotel"
                      auto-complete="off"
                      maxlength="20"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="类型" label-width="80px" prop="category">
                  <el-checkbox-group v-model="getterDetailForm.category">
                    <el-checkbox
                      :label="item"
                      v-for="item in categoryList"
                      :key="item"
                    ></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="封面图片" label-width="80px">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="10" :offset="2" class="models-part">
            <el-row>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="简介描述(按回车键保持分行)"
                v-model="getterDetailForm.describe"
                class="parse-address-textarea"
              ></el-input>
            </el-row>
            <!-- <el-row>
              <el-checkbox v-model="checked">保存为常用收件人</el-checkbox>
            </el-row>-->
          </el-col>
        </el-row>
      </el-row>
      <el-row class="add-order-models">
        <el-row class="title-part">
          <span
            >图片信息
            <span style="color:#999；font-size:12px"
              >(每页最多两张图片，图片大小控制在250kb内，建议100kb左右清晰可见即可)</span
            ></span
          >
        </el-row>
        <el-form
          :model="productListForm"
          :inline="true"
          ref="productListForm"
          class="demo-dynamic"
        >
          <el-form-item class="product-part-title">
            添加页面
            <!-- <el-button @click="addProduct">+</el-button> -->
            <span @click="addProduct" class="add-product-button">+</span>
          </el-form-item>
          <el-form-item
            v-for="(domain, index) in getterDetailForm.picItems"
            :key="domain.key"
            class="product-part-list"
            @click.native="getIndex(index)"
            style="width:100%;"
          >
            <el-col :span="1">{{ index + 1 + "" }}</el-col>
            <el-col :span="6">
              <el-upload
                :ref="'imgUpload' + index"
                action="/api-dev/upload"
                list-type="picture-card"
                :http-request="imgUploadFn"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-col>
            <template v-for="(item, cIndex) in domain.picList">
              <el-col
                :span="4"
                :offset="1"
                :key="item.key"
                style="width:100px;height:100px;position:relative;background: #d9dce2;boder-radius:5px"
              >
                <el-image
                  style="width: 100px; height: 100px"
                  :src="item"
                  fit="contain"
                ></el-image>
                <i
                  class="el-icon-close"
                  style="position:absolute;right:0;top:0;border:1px solid;border-radius:50%;"
                  @click.stop="deleteImg(index, cIndex)"
                ></i>
              </el-col>
            </template>
            <el-col :span="1" :offset="1">
              <!-- <el-button @click.prevent="removeProduct(domain)">删除</el-button> -->
              <span
                class="delete-button"
                @click.prevent="removeProduct(domain)"
                v-if="getterDetailForm.picItems.length > 1"
                >一</span
              >
            </el-col>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="validForm('save')"
          :loading="importing"
          >保存</el-button
        >
        <el-button type="primary" @click="addDialogVisible = false"
          >取消</el-button
        >
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import * as configApi from "@/api/config";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
@Component({})
export default class AddWedding extends Vue {
  $refs: any = {
    editDialog: HTMLElement
  };
  @Prop({ default: [""] })
  readonly categoryList!: string[];
  addDialogVisible: boolean = false;
  dialogVisible: boolean = false;
  addOrderForm: any = {
    name: "",
    region: "",
    date1: "",
    date2: "",
    deliveryId: "",
    type: [],
    resource: "",
    desc: ""
  };
  type = "add";
  importing = false;
  getterDetailFormRules = {
    title: [{ required: true, message: "输入名称", trigger: "change" }],
    price: [{ required: true, message: "请输入价格", trigger: "change" }]
  };
  dialogImageUrl = "";
  id = 0;
  checked = true;
  textarea = "";
  productListForm = {
    productList: [
      {
        picList: []
      }
    ]
  };
  handleChange(file: any, fileList: any) {}
  imgIndex = 0;
  getterDetailForm = {
    price: 88888,
    title: "",
    describe: "",
    category: [],
    hotel: "",
    pagePic: "",
    picItems: [
      {
        picList: []
      }
    ]
  };
  created() {}
  open(id: any) {
    this.getterDetailForm = {
      price: 88888,
      title: "",
      describe: "",
      category: [],
      hotel: "",
      pagePic: "",
      picItems: [
        {
          picList: []
        }
      ]
    };
    if (id) {
      this.type = "edit";
      configApi.getWedding({ id }).then(res => {
        this.getterDetailForm = res[0];
        this.addDialogVisible = true;
      });
    } else {
      this.type = "add";
      this.addDialogVisible = true;
    }
  }
  handleAvatarSuccess(res: any, file: any) {
    // this.imgUpload.src = res.data;
  }
  imgUploadFn(content: any) {
    const formData = new FormData();
    formData.append("file", content.file);
    configApi
      .uploadImg(formData)
      .then((res: any) => {
        // this.getIndex(content.file.uid);
        // console.log(this.imgIndex);
        //@ts-ignore
        this.getterDetailForm.picItems[this.imgIndex].picList.push(res);
        // this.$set(this.imgUpload, "src", res);
      })
      .catch((err: any) => {
        this.$alert(err.msg);
      });
  }
  getIndex(index: any) {
    this.imgIndex = index;
  }
  beforeAvatarUpload(file: any) {
    if (this.getterDetailForm.picItems[this.imgIndex].picList.length === 2) {
      this.$message.error("每页最多两张");
      return false;
    }
    // console.log(file.type)
    const isJPG = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 < 250;

    if (!isJPG) {
      this.$message.error("上传图片只能是 JPG/PNG 格式!");
    }
    if (!isLt2M) {
      this.$message.error("上传图片大小不能超过 250kb!");
    }
    return isJPG && isLt2M;
  }
  handleClose() {
    this.resetForm();
  }
  handleRemove(file: any, fileList: any) {
    console.log(file, fileList);
  }
  handlePictureCardPreview(file: any) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }
  validForm(type: string) {
    if (this.getterDetailForm.category.length === 0) {
      this.$message.error("请选择至少一个类型");
    }
    this.$refs.getterDetailForm.validate((valid: any) => {
      if (!valid) return;
      this.onSubmit(type);
    });
  }
  onSubmit(type: string) {
    if (this.type === "add") {
      // @ts-ignore
      configApi.addWedding(this.getterDetailForm).then(() => {
        this.$message.success("添加成功");
        this.addDialogVisible = false;
        this.$emit("update");
      });
    } else {
      configApi.updateWedding(this.getterDetailForm).then(() => {
        this.$message.success("更新成功");
        this.addDialogVisible = false;
        this.$emit("update");
      });
    }
  }
  resetForm() {
    this.textarea = "";
    this.$refs.getterDetailForm.resetFields();
    this.$refs.productListForm.resetFields();
  }

  deleteImg(fIndex: number, cIndex: number) {
    this.getterDetailForm.picItems[fIndex].picList.splice(cIndex, 1);
  }
  removeProduct(item: any) {
    const index = this.getterDetailForm.picItems.indexOf(item);
    if (index !== -1) {
      this.getterDetailForm.picItems.splice(index, 1);
    }
  }
  addProduct() {
    this.getterDetailForm.picItems.push({
      picList: []
    });
  }
}
</script>

<style lang="stylus">
.addOrder-container
  .add-order-models
    background white
    margin 5px 0
    border-radius 4px 4px 0px 0px
    display inline-block
    width 100%
    .title-part
      height 50px
      line-height 50px
      border-bottom 2px rgba(226, 232, 239, 1) solid
      padding-left 20px
    .product-part-title
      padding 20px
      margin-bottom 0
      width 100%
    .product-part-list
      padding-left 20px
      margin-bottom 5px
    .address-select-part
      padding 20px
    .add-deliverAddress-button
      margin-left 50px
  .dialog-footer
    display inline-block
    // position absolute
    bottom 20px
    // background white
    width 100%
    text-align center
    margin-top 0
    .el-button
      height 34px
      min-width 106px
      font-size 14px
      font-weight 500
      margin-right 1px
  .el-dialog
    height 100%
    margin-top 0 !important
  .el-dialog__body
    padding-bottom 0
    overflow-y scroll
    overflow-x hidden
    height calc(100% - 115px)
    // padding-bottom 110px
    box-sizing border-box
  .el-dialog__footer
    position absolute
    bottom -1px
    width 100%
    background #f5f8fc
  .parse-address-onTextarea
    padding 10px
    box-sizing border-box
  .parse-address-textarea
    box-sizing border-box
    padding 10px
    padding-top 15px
  .link
    line-height 32px
    margin-left 30px
.k-icon-plaint-fill
  font-size 13px !important
.delete-button
  font-size 18px
  color #DF3D00FF
  cursor pointer
  font-weight bold
  height 100px
  line-height 100px
.add-product-button
  font-size 33px
  cursor pointer
  font-weight bold
  color #168af8
  // position absolute
  line-height -8px
  top 0
  line-height 23px
  left 53px
.el-form-item__content
  width 100%
  .el-upload--picture-card
    width 100px
    height 100px
    line-height 100px
.demo-dynamic
  .el-icon-close
    color #67c23a
    cursor pointer
</style>
