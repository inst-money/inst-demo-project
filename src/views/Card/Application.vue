<template>
  <div class="step__box">
    <Step :current="getStep" :steps="steps" />
    <router-view />
  </div>
</template>

<script>
import Step from "@/components/Step.vue";

export default {
  name: "Application",
  components: { Step },
  data() {
    return {
      steps: ["Step", "Result"],
    };
  },
  computed: {
    getStep() {
      const step = ["/card/application/data", "/card/application/result"];
      return step.indexOf(this.$route.path);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
