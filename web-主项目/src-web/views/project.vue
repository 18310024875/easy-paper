<template>
  <div class="project-view">
    project-view
    <el-input
      v-model="addText"
      @keyup.enter="add"
      class="mb-[10px] w-[200px]"
    />
    <ul>
      <li class="flex items-center mb-[10px]" v-for="(v, k) in list" :key="k">
        <span class="mr-[10px] text-[#409eff]">
          {{ v.companies?.[0].name }}
        </span>
        <el-input
          class="mr-[10px] w-[200px]"
          v-model="v.name"
          @keyup.enter="edit(v)"
        />
        <el-button class="" @click="del(v)">delete</el-button>
        <el-button class="" type="primary" @click="goModole(v)">
          module
        </el-button>
        <el-button class="" type="primary" @click="gopro(v)">
          design project
        </el-button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addText: "",
      list: [],
    };
  },
  computed: {
    companyId() {
      return this.$route.query.companyId;
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.request
        .post("/api/project/getProjectsByCompanyid", {
          companyId: this.companyId,
        })
        .then((res) => {
          this.list = res.data || [];
        });
    },
    add() {
      if (this.addText.trim()) {
        this.request
          .post("/api/project/add", {
            companyId: this.companyId,
            name: this.addText.trim(),
          })
          .then((res) => {
            this.addText = "";
            this.getList();
          });
      }
    },
    edit(v) {
      if (v.name.trim()) {
        this.request
          .post("/api/project/update", {
            name: v.name.trim(),
            id: v._id,
          })
          .then((res) => {
            this.getList();
          });
      }
    },
    del(v) {
      this.request
        .post("/api/project/delete", {
          id: v._id,
        })
        .then((res) => {
          this.getList();
        });
    },
    goModole(v) {
      this.$router.push({
        path: "/module",
        query: {
          companyId: this.companyId,
          projectId: v._id,
        },
      });
    },
    gopro(v) {
      window.open(`/design.html?companyId=${v.companyId}&projectId=${v._id}`);
    },
  },
};
</script>
<style scoped lang="less">
.project-view {
  height: 100vh;
  position: relative;
}
</style>
