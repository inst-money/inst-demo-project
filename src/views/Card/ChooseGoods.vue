<template>
  <div class="g-container">
    <div class="demo">演示</div>
    <Button class="btn--next" label="购买商品" @click="buyGoods" />
    <Button class="btn--next" label="Buy Coin" @click="buyCoin" />
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
