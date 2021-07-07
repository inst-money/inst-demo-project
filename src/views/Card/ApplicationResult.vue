<template>
  <div class="g-container apply-finish">
    <div class="container">
      <img
        v-if="isKYCSuccess || isActivatSuccess"
        class="img"
        src="../../assets/images/chenggong.svg"
        alt="pending"
      />
      <img
        v-if="isKYC || isActivating"
        class="img"
        src="../../assets/images/shenhezhong.svg"
        alt="pending"
      />
      <img
        v-if="isKYCSuccess || isActivatSuccess"
        class="img"
        src="../../assets/images/chenggong.svg"
        alt="pending"
      />
      <div class="label">{{ $t(step) }}</div>
      <div class="pending-tip">{{ reason }}</div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import { Base64 } from "js-base64";
import { getKycStatus } from "@/api/data";

export default {
  name: "ApplicationResult",
  components: { Button },
  data() {
    return {
      isKYC: false,
      isKYCFail: false,
      isKYCSuccess: false,
      isActivating: false,
      isActivatFail: false,
      isActivatSuccess: false,
      reason: "",
      step: "kyc",
    };
  },
  created() {
    // this.$i18n.locale = "en";
    // localStorage.setItem("locale", en);
    const { data } = this.$route.query;
    let reldata = JSON.parse(Base64.decode(data));
    const { step, reason } = reldata.result;
    this.step = step;
    this.reason = reason;
    switch (step) {
      case "kyc":
        this.isKYC = true;
        breack;
      case "kyc-fail":
        this.isKYCFail = true;
        break;
      case "kyc-success":
        this.isKYCSuccess = true;
        break;
      case "activating":
        this.isActivating = true;
        break;
      case "activate-fail":
        this.isActivatFail = true;
        break;
      case "activate-success":
        this.isActivatSuccess = true;
        break;
      default:
        return;
    }
    // if (step === "kyc") {
    //   this.isKYC = true;
    // }
    // if (step === "opened") {
    //   this.isOpened = true;
    // }
    // if (step === "activating") {
    //   this.isActivating = true;
    // }
    // if (step === "activated") {
    //   this.isActivated = true;
    // }
  },
  methods: {
    // go2Apply() {
    //   this.$router.push({
    //     path: "/apply/data",
    //     query: {
    //       id: this.$route.query.id,
    //     },
    //   });
    // },
    // getStatus() {
    //   getKycStatus(this.$route.query.id).then(({ result }) => {
    //     this.reason = result.code;
    //   });
    // },
  },
  // created() {
  //   if (this.$route.query.fail) {
  //     this.isFail = true;
  //     this.getStatus();
  //   }
  // },
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
