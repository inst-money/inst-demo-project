<template>
  <div class="g-container">
    <Button
      class="btn--next"
      label="Buy Coin"
      @click="buyCoin"
      :disable="searchDisabled"
    />
    <Button
      class="btn--next"
      label="Buy goods"
      @click="buyGoods"
      :disable="searchDisabled"
    />
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
.btn--next {
  margin: var(--space-bottom) 0;
}
</style>
