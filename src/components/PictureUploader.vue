<template>
  <van-uploader
    class="picture-uploader__vant"
    :max-count="1"
    :max-size="SELECT_SIZE_LIMIT"
    :after-read="handleLoad"
    @oversize="onOverSize"
  >
    <div class="picture-uploader">
      <img v-if="base64" class="img" :src="base64" alt="preview">
      <span v-else class="label">+</span>
    </div>
  </van-uploader>
</template>

<script>
import Compressor from 'compressorjs';
import { blob2Base64 } from '@/utils/format';

const SELECT_SIZE_LIMIT = 10 * 1024 * 1024;
const SIZE_LIMIT = 2 * 1024 * 1024;

export default {
  name: 'PictureUploader',
  props: {
    base64: { // sync
      type: String,
      require: true,
    },
  },
  data() {
    return {
      SELECT_SIZE_LIMIT,
    };
  },
  methods: {
    onOverSize() {
      this.$toast(this.$t('size_limit_10'));
    },
    handleLoad(result) {
      if (!(result && result.file)) {
        return;
      }
      const quality = Math.min(SIZE_LIMIT / result.file.size, 1);
      // eslint-disable-next-line no-new
      new Compressor(result.file, {
        quality,
        convertSize: SIZE_LIMIT,
        success: async (res) => {
          if (res.size > SIZE_LIMIT) {
            this.$toast(this.$t('size_limit'));
            return;
          }
          this.$emit('update:base64', await blob2Base64(res));
        },
        error() {},
      });
      // this.$emit('update:base64', file.content);
    },
  },
};
</script>

<style lang="scss" scoped>
  .picture-uploader {
    width: 100%;
    height: 3.6rem;
    line-height: 3.6rem;
    text-align: center;
    background: #F2F2F2;
    border-radius: .2rem;
    color: #D8D8D8;
    overflow: hidden;
  }

  .label {
    font-size: .5rem;
  }

  .img {
    max-height: 100%;
    max-width: 100%;
    vertical-align: middle;
  }
</style>
