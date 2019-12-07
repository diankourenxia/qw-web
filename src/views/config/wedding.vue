<template>
  <div>
    <el-row class="setting-tag-container">
      <span>类型设置: </span><br />
      <el-tag
        :key="tag"
        v-for="tag in categoryTags.dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleCategoryTagsClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="categoryTags.inputVisible"
        v-model="categoryTags.inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput"
        >+ 新类型</el-button
      >
    </el-row>
    <el-row class="setting-tag-container">
      <span>价格区间设置（使用 / 隔开,如：5000/50000）: </span> <br />
      <el-tag
        :key="tag"
        v-for="tag in priceRange.dynamicTags"
        closable
        :disable-transitions="false"
        @close="handlePriceRangeClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="priceRange.inputVisible"
        v-model="priceRange.inputValue"
        ref="savePriceInput"
        size="small"
        @keyup.enter.native="handlePriceInputConfirm"
        @blur="handlePriceInputConfirm"
      >
      </el-input>
      <el-button
        v-else
        class="button-new-tag"
        size="small"
        @click="showPriceInput"
        >+ 新区间</el-button
      >
    </el-row>
    <el-button type="primary" @click="handleClickAdd">新建案例</el-button>

    <el-table
      class="table"
      size="medium"
      :data="weddingData"
      :header-cell-style="HEADER_CELL_STYLE"
    >
      <el-table-column
        align="center"
        type="index"
        label="序号"
      ></el-table-column>
      <el-table-column label="名称" prop="title"> </el-table-column>
      <el-table-column label="描述" prop="describe"> </el-table-column>
      <el-table-column label="价格" prop="price"> </el-table-column>
      <el-table-column label="酒店" prop="hotel"> </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <div>
            {{ scope.row.category.join(" ") }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button size="mini" type="primary" @click="handleUpdate(row._id)"
            >编辑</el-button
          >
          <el-button size="mini" plain @click="handleDelete(row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <add-wedding-dialog
      ref="editDialog"
      @save="handleAddWedding"
      :categoryList="categoryTags.dynamicTags"
      @update="handleQuery"
    ></add-wedding-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import {
  getWeddingList,
  deleteWedding,
  getCategoryList,
  updateCategory,
  getWedding
} from "@api/config";
import {
  ConfigQueryPageParams,
  ConfigAddressResult,
  CreateConfigAddress,
  UpdateConfigAddress,
  ConfigAddressItem
} from "@interface/config.interface";
import AddWeddingDialog from "./components/AddWedding.vue";

@Component({
  components: {
    AddWeddingDialog
  },
  filters: {
    buttonText: (isDefault: boolean) => {
      if (isDefault) {
        return "默认地址";
      }
      return "设为默认";
    },
    buttonType: (isDefault: boolean) => {
      if (isDefault) {
        return "warning";
      }
      return "primary";
    }
  }
})
export default class AddressConfig extends Vue {
  $refs: any = {
    editDialog: HTMLElement
  };
  categoryTags = {
    dynamicTags: ["唯美/清新"],
    inputVisible: false,
    inputValue: "",
    handleClose: function(tag: any) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    }
  };
  categoryParam = {};
  priceRange = {
    dynamicTags: ["0/5000"],
    inputVisible: false,
    inputValue: ""
  };
  handlePriceRangeClose(tag: any) {
    this.priceRange.dynamicTags.splice(
      this.priceRange.dynamicTags.indexOf(tag),
      1
    );
    // @ts-ignore
    this.categoryParam.price.list = this.priceRange.dynamicTags;
    this.handleUpdateCategory();
  }
  handleCategoryTagsClose(tag: any) {
    this.categoryTags.dynamicTags.splice(
      this.categoryTags.dynamicTags.indexOf(tag),
      1
    );
    // @ts-ignore
    this.categoryParam.style.list = this.categoryTags.dynamicTags;
    this.handleUpdateCategory();
  }
  handleInputConfirm() {
    let inputValue = this.categoryTags.inputValue;
    if (inputValue) {
      this.categoryTags.dynamicTags.push(inputValue);
      // @ts-ignore
      this.categoryParam.style.list = this.categoryTags.dynamicTags;
      this.handleUpdateCategory();
    }
    this.categoryTags.inputVisible = false;
    this.categoryTags.inputValue = "";
  }
  handleQuery() {
    getWeddingList().then((res: any) => {
      this.weddingData = res;
    });
  }
  handleQueryCategory() {
    let param = {};
    getCategoryList(param).then((res: any) => {
      this.categoryParam = res[0];
      this.priceRange.dynamicTags = res[0].price.list;
      this.categoryTags.dynamicTags = res[0].style.list;
    });
  }
  handlePriceInputConfirm() {
    if (this.priceRange.inputValue.indexOf("/") === -1) {
      this.$message.error("数据格式错误");
      this.priceRange.inputValue = "";
      return false;
    }
    if (
      this.priceRange.inputValue.split("/")[0].match(/\D/) ||
      this.priceRange.inputValue.split("/")[1].match(/\D/)
    ) {
      this.$message.error("只允许 数字/数字 格式");
      return false;
    }
    if (
      Number(this.priceRange.inputValue.split("/")[0]) <
      Number(
        this.priceRange.dynamicTags[
          this.priceRange.dynamicTags.length - 1
        ].split("/")[1]
      )
    ) {
      this.$message.error("新添加的第一位数据必须大于等于上一个数据的最大值");
      return false;
    }
    if (
      Number(this.priceRange.inputValue.split("/")[1]) <
      Number(this.priceRange.inputValue.split("/")[0])
    ) {
      this.$message.error("第二位数据必须大于第一位数据");
      return false;
    }

    let inputValue = this.priceRange.inputValue;
    if (inputValue) {
      this.priceRange.dynamicTags.push(inputValue);
      // @ts-ignore
      this.categoryParam.price.list = this.priceRange.dynamicTags;
      this.handleUpdateCategory();
    }
    this.priceRange.inputVisible = false;
    this.priceRange.inputValue = "";
  }
  showPriceInput() {
    this.priceRange.inputVisible = true;
    this.$nextTick(() => {
      this.$refs.savePriceInput.$refs.input.focus();
    });
  }
  handleUpdateCategory() {
    updateCategory(this.categoryParam).then(res => {
      this.$message.success("更新成功");
      console.log(res);
    });
  }
  showInput() {
    this.categoryTags.inputVisible = true;
    this.$nextTick(() => {
      this.$refs.saveTagInput.$refs.input.focus();
    });
  }
  selectedId?: number;
  type?: "edit" | "add";
  weddingData = [];
  // 表头样式
  HEADER_CELL_STYLE = {
    "background-color": "#E6EEF5",
    color: "#303133"
  };

  created() {
    this.handleQueryCategory();
    this.handleQuery();
  }
  handleDelete(id: any) {
    let param = {
      _id: id
    };
    deleteWedding(param).then(() => {
      getWeddingList().then((res: any) => {
        this.weddingData = res;
      });
    });
  }
  handleUpdate(id: any) {
    this.$refs.editDialog.open(id);
  }
  queryAddress() {
    const params = {
      currentPage: 1,
      needCount: false,
      size: 200
    };
  }

  handleAddWedding(row: ConfigAddressItem) {
    this.type = "edit";
    this.selectedId = row.id;
    this.$refs.editDialog.open();
  }

  handleClickAdd() {
    this.type = "add";
    this.$refs.editDialog.open();
  }
}
</script>

<style lang="stylus" scoped>
.table
  margin-top 20px
  .el-button
    &:focus
      outline 0
  i
    color $color-info
    font-size $font-size-base
.el-tag + .el-tag
  margin-left 10px
.button-new-tag
  margin-left 10px
  height 32px
  line-height 30px
  padding-top 0
  padding-bottom 0
.input-new-tag
  width 90px
  margin-left 10px
  vertical-align bottom
.setting-tag-container
  margin 10px 0
</style>
