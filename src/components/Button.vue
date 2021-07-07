<template>
  <div
    class="button"
    :class="{
      primary: type === 'primary',
      link: type === 'link',
      inline: inline,
      disable: disable || loading
    }"
    role="button"
    tabIndex="0"
    :aria-label="label"
    @click="clickHandler"
  >
    <van-loading class="button__loading" v-if="loading" />
    <span v-if="label" class="button__label">{{ label }}</span>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'primary', // primary link
      require: false,
    },
    label: {
      type: String,
      default: '',
      require: false,
    },
    disable: {
      type: Boolean,
      require: false,
      default: false,
    },
    inline: {
      type: Boolean,
      require: false,
      default: false,
    },
    loading: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  methods: {
    clickHandler(e) {
      if (this.disable || this.loading) {
        return;
      }
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  outline: none;

  &.inline {
    display: inline-block;
    &.primary {
      min-width: 4rem;
    }
  }

  &.primary {
    height: 0.8rem;
    line-height: 0.8rem;
    background: var(--color-theme);
    color: #fff;
    text-align: center;
    font-size: 0.28rem;
    font-weight: 500;
    border-radius: 0.4rem;
  }

  &.coupon {
    height: 0.8rem;
    line-height: 0.8rem;
    background: var(--color-coupon);
    color: #fff;
    text-align: center;
    font-size: 0.28rem;
    font-weight: 500;
    border-radius: 0.4rem;
  }

  &.link {
    font-size: 0.3rem;
    line-height: 0.42rem;
    text-decoration: underline;
  }

  &.disable {
    opacity: 0.3;
  }
}

.button__loading {
  margin-right: 0.1rem;
  display: inline-block;
  color: #fff;
}

.button__label {
  vertical-align: middle;
}
</style>
