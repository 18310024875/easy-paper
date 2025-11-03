<template>
  <div style="font-size: 16px">
    <div>账号 <input style="line-height: 30px" v-model="account" /></div>
    <div style="margin-top: 10px">
      密码
      <input
        style="line-height: 30px"
        v-model="password"
        type="password"
        @keyup.enter="handle"
      />
    </div>
  </div>
</template>
<script>
import request from "common/request";
export default {
  data() {
    return {
      account: "admin",
      password: "admin",
    };
  },
  methods: {
    handle() {
      let account = this.account.trim();
      let password = this.password.trim();
      if (!account || !password) return;
      request
        .post("/public-api/user/login", { account, password })
        .then((res) => {
          const sParams = new URLSearchParams(location.search);
          if (sParams.get("callback")) {
            location.href = decodeURIComponent(sParams.get("callback"));
          } else {
            location.href = "/";
          }
        });
    },
  },
};
</script>
