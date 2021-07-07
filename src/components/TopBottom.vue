<template>
  <div class="top-bottom">
    <div class="top-bottom__top">
      <slot />
    </div>
    <div>
      <slot name="bottom" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBottom',
};
</script>

<style lang="scss" scoped>
.top-bottom {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-bottom__top {
  flex: 1;
}
</style>
