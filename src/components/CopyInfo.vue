<template>
  <div class="copy-info">
    <span>{{ label }}</span>
    <img
      ref="clipTarget"
      src="../assets/images/copy.svg"
      alt="copy"
      :data-clipboard-text="label"
    >
  </div>
</template>

<script>
import Clipboard from 'clipboard';

export default {
  name: 'CopyInfo',
  props: {
    label: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      clip: null,
    };
  },
  mounted() {
    this.initCopy();
  },
  beforeDestroy() {
    if (this.clip) {
      this.clip.off('error');
      this.clip.off('success');
      this.clip.destroy();
    }
  },
  methods: {
    initCopy() {
      this.clip = new Clipboard(this.$refs.clipTarget);
      this.clip.on('success', (e) => {
        e.clearSelection();
        this.$toast(this.$t('copy_success'));
      });
      this.clip.on('error', (e) => {
        e.clearSelection();
        this.$toast(this.$t('copy_fail'));
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .copy-info {
    line-height: .4rem;
    font-size: .26rem;
    text-align: center;
    color: var(--color-content);

    span {
      vertical-align: middle;
    }

    img {
      margin-left: .14rem;
      width: .4rem;
      vertical-align: middle;
    }
  }
</style>
