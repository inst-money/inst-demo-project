<template>
  <div class="g-container apply-finish">
    <div v-if="isFail" class="container">
      <img class="img" src="../../assets/images/shibai.svg" alt="fail" />
      <div class="label">{{ $t("review_fail") }}</div>
      <div class="reason">（{{ $t(`code${reason}`) }}）</div>
      <Button
        class="g-btn--fixed"
        :label="$t('try_review')"
        @click="go2Apply"
      />
    </div>
    <div v-else class="container">
      <img
        class="img"
        src="../../assets/images/shenhezhong.svg"
        alt="pending"
      />
      <div class="label">{{ $t("review_pending") }}</div>
      <div class="pending-tip">{{ $t("review_pending_tip") }}</div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import { getKycStatus } from "@/api/data";

export default {
  name: "ApplicationResult",
  components: { Button },
  data() {
    return {
      isFail: false,
      reason: "",
    };
  },
  methods: {
    go2Apply() {
      this.$router.push({
        path: "/apply/data",
        query: {
          id: this.$route.query.id,
        },
      });
    },
    getStatus() {
      getKycStatus(this.$route.query.id).then(({ result }) => {
        this.reason = result.code;
      });
    },
  },
  created() {
    if (this.$route.query.fail) {
      this.isFail = true;
      this.getStatus();
    }
  },
};
</script>

<style lang="scss" scoped>
.apply-finish {
  text-align: center;
}

.container {
  margin-top: 2rem;
  padding-bottom: var(--padding-fixed-bottom);
}

.img {
  width: 1.4rem;
}

.label {
  margin-top: 0.4rem;
  line-height: 0.5rem;
  font-size: 0.36rem;
  color: var(--color-content);
}

.reason {
  margin-top: 0.2rem;
  line-height: 0.4rem;
  font-size: 0.24rem;
  color: var(--color-des);
}

.pending-tip {
  margin-top: 0.4rem;
  padding: 0 0.6rem;
  font-size: 0.24rem;
  line-height: 0.4rem;
  color: var(--color-des);
}
</style>
