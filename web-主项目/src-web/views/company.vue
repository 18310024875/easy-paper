<template>
  <div class="company-view">
    company-view
    <el-input
      v-model="addText"
      @keyup.enter="add"
      class="mb-[10px] w-[200px]"
    />
    <ul>
      <li class="flex items-center mb-[10px]" v-for="(v, k) in list" :key="k">
        <el-input
          class="mr-[10px] w-[200px]"
          v-model="v.name"
          @keyup.enter="edit(v)"
        />
        <el-button class="" @click="del(v)">delete</el-button>
        <el-button class="" type="primary" @click="goProject(v)">
          project
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
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.request.post("/api/company/getCompanysByUserid").then((res) => {
        this.list = res.data || [];
      });
    },
    add() {
      if (this.addText.trim()) {
        this.request
          .post("/api/company/add", {
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
          .post("/api/company/update", {
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
        .post("/api/company/delete", {
          id: v._id,
        })
        .then((res) => {
          this.getList();
        });
    },
    goProject(v) {
      this.$router.push({
        path: "/project",
        query: {
          companyId: v._id,
        },
      });
    },
  },
};
</script>
<style scoped lang="less">
.company-view {
  height: 100vh;
  position: relative;
}
</style>
