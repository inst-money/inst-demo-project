<template>
  <div class="g-container">
    <div class="demo">演示</div>
    <Button class="btn--next" label="法币收款(聚合买币)" @click="buyCoin" />
    <Button class="btn--next" label="加密货币收款" @click="buyGoods" />
    <Button
      class="btn--next"
      label="法币/加密货币收款"
      @click="buyGoodsCurrency"
    />
    <Button class="btn--next" label="买/卖加密货币" />
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "ChooseRule",
  components: { Button },
  data() {
    return {};
  },

  methods: {
    buyCoin() {
      this.$router.push({
        path: "/card/chooseRule",
      });
    },
    buyGoods() {
      this.$router.push({
        path: "/card/advGoods",
      });
    },
    buyGoodsCurrency() {
      this.$router.push({
        path: "/card/advCollection",
      });
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
