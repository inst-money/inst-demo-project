<template>
  <div class="step">
    <div class="line"/>
    <div
      v-for="(item,index) in steps"
      :key="item"
      class="dot"
      :class="{active:index <=current}"
    >
      <div class="label">{{item}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Step',
  props: {
    current: {
      type: Number,
      require: true,
    },
    steps: {
      type: Array,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .step {
    position: relative;
    padding: .6rem;
    display: flex;
    justify-content: space-between;
  }

  .line {
    z-index: -1;
    position: absolute;
    top: 50%;
    right: .6rem;
    left: .6rem;
    margin-top: -.03rem;
    height: .06rem;
    background: rgba(0, 0, 0, .06);
  }

  .dot {
    position: relative;
    box-sizing: border-box;
    width: .2rem;
    height: .2rem;
    border-radius: 50%;
    background: #D1D1D1;

    &.active {
      border: .05rem solid var(--color-theme);
      background: #FFF;

      .label {
        color: #000;
      }
    }
  }

  .label {
    position: absolute;
    top: calc(100% + .3rem);
    left: 50%;
    transform: translateX(-50%);
    font-size: .22rem;
    line-height: .3rem;
    white-space: nowrap;
    color: var(--color-des);
  }
</style>
