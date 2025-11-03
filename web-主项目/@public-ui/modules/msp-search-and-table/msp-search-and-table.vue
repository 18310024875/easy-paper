<template>
  <div class="msp-search-and-table">
    <div class="seatch-wrap">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="来访人" style="width: 200px">
          <el-input v-model="formInline.user" placeholder="" clearable />
        </el-form-item>
        <!-- <el-form-item label="来访地区">
          <el-select
            style="width: 160px"
            v-model="formInline.region"
            placeholder=""
            clearable
          >
            <el-option label="Zone one" value="西安" />
            <el-option label="Zone two" value="北京" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="来访时间">
          <el-date-picker
            v-model="formInline.date"
            style="width: 180px"
            placeholder=""
            type="date"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrap">
      <el-table :data="tableData" stripe style="width: 100%; height: 100%">
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </div>
  </div>
</template>
<script>
const widgetLabel = "search+table模块";
const defaultWidth = 800;
const defaultHeight = 400;
const getPropConfig = () => ({});
const getEventConfig = () => ({});
import mixin from "@public-ui/mixin";
export default {
  widgetLabel,
  defaultWidth,
  defaultHeight,
  getPropConfig,
  getEventConfig,
  mixins: [mixin],
  data() {
    return {
      formInline: {
        user: "",
        region: "",
        date: [],
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
};
</script>
<style scoped lang="less">
.msp-search-and-table {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #f0f0f0;
  padding: 14px;
  .seatch-wrap {
    flex: 0 0 auto;
    padding-top: 16px;
    background: white;
    padding-left: 20px;
    border-radius: 6px;
  }
  .table-wrap {
    margin-top: 14px;
    flex: 1;
    border-radius: 6px;
    overflow: hidden;
  }
}
</style>
