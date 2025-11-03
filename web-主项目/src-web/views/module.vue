<template>
  <div class="module-view">
    module-view
    <el-input
      placeholder="按enter添加模块"
      v-model="addText"
      @keyup.enter="add"
      class="w-[200px] mr-[10px]"
    />
    <input type="file" @change="selectFile" ref="file" />
    <ul>
      <li class="flex mb-[10px]" v-for="(v, k) in list" :key="k">
        <span class="mr-[10px] text-[#409eff]">
          {{ v.companies?.[0].name }}/
        </span>
        <span class="mr-[10px] text-[#e03a8d]">
          {{ v.projects?.[0].name }}/
        </span>
        <span class="mr-[10px] text-[rgb(28,216,44)]">{{ v.name }}</span>
        <span class="mr-[10px]">originname={{ v.originname }}</span>
        <el-button class="" @click="download(v)">download</el-button>
        <el-button class="" @click="del(v)">delete</el-button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addText: "",
      file: null,
      list: [],
    };
  },
  computed: {
    companyId() {
      return this.$route.query.companyId;
    },
    projectId() {
      return this.$route.query.projectId;
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    selectFile(e) {
      this.file = e.target.files[0];
    },
    getList() {
      this.request
        .post("/api/module/getModulesByProjectid", {
          companyId: this.companyId,
          projectId: this.projectId,
        })
        .then((res) => {
          this.list = res.data || [];
        });
    },
    add() {
      if (!this.file) return alert("请添加文件");
      if (!this.addText.trim()) return;
      const formData = new FormData();
      formData.append("uploadFiles", this.file);
      this.request
        .post("/api/module/add", formData, {
          params: {
            companyId: this.companyId,
            projectId: this.projectId,
            name: this.addText.trim(),
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.file = null;
          this.addText = "";
          this.$refs.file = "";
          this.getList();
        });
    },
    download(v) {
      let url = "http://127.0.0.1:3000" + v.serverPath;
      window.open(url);
    },
    del(v) {
      this.request
        .post("/api/module/delete", {
          id: v._id,
        })
        .then((res) => {
          this.getList();
        });
    },
  },
};
</script>
<style scoped lang="less">
.module-view {
  height: 100vh;
  position: relative;
}
</style>
