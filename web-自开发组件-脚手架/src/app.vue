<template>
  <ok/>
</template>
<script>
import ok from './ok3/index.vue'
export default {
  components: {
    ok
  },
  inject: ["DEP_MODULES"],
  mounted() {
    console.log(this.DEP_MODULES);
  },
};
</script>
