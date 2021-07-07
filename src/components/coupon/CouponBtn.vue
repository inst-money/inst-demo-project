<template>
  <div class="coupon-btn">
    <Button class="coupon" @click="goTo()">{{ $t("coupon") }}</Button>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'CouponBtn',
  components: { Button },
  methods: {
    goTo() {
      this.$router.push({
        path: '/coupon',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.coupon-btn {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  padding-left: var(--space-side);
  padding-bottom: var(--space-bottom);
  padding-right: var(--space-side);
  padding-top: var(--space-top);
}
</style>
