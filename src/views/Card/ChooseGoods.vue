<template>
  <div class="g-container">
    <SwitchLang />
    <div class="demo">{{ $t("demo") }}</div>
    <Button class="btn--next" :label="$t('choose1')" @click="buyCoin" />
    <Button
      class="btn--next"
      :label="$t('choose4')"
      @click="transcationCryptoCurrency"
    />
    <Button class="btn--next" :label="$t('choose2')" @click="buyGoods" />
    <Button
      class="btn--next"
      :label="$t('choose5')"
      @click="buyGoodsCurrency"
    />
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import SwitchLang from "@/components/SwitchLang.vue";

export default {
  name: "ChooseRule",
  components: { Button, SwitchLang },
  data() {
    return {
      mobileLangValue: "",
    };
  },

  methods: {
    buyCoin() {
      this.$router.push({
        path: "/demo/chooseRule",
      });
    },
    buyGoods() {
      this.$router.push({
        path: "/demo/advGoods",
      });
    },
    buyGoodsCurrency() {
      console.log("111");
    },
    transcationCryptoCurrency() {
      // this.$router.push({
      //   path: "/demo/transactionCryptoCurrency",
      // });
      window.open(
        "https://buy.sandbox.inst.money/crypto?id=b5d0b997c2444eb98e26bd93e3f5fe48",
        "_blank"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.demo {
  font-size: 48px;
  text-align: center;
  font-weight: bold;
  margin-top: 40px;
}
.btn--next {
  margin: var(--space-bottom) 0;
}
</style>
