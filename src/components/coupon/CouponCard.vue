<template>
  <div>
    <div class="coupon-card" v-if="show === true" :opacity="status">
      <div class="coupon-num g-font-num">
        <span class="superscript">USDT</span>
        <span class="discount-num">{{ parseFloat(target.used_amount).toFixed(0) }}</span>
      </div>
      <div class="card-info">
        <div class="card-title">
          <span :class="$t('cn-show') + ' card-max'">{{ target.title }}</span>
          <span :class="$t('en-show') + ' card-max'">{{ target.title_en }}</span>
          <br />
          <span class="date card-data">{{ date }} {{ $t("coupon_deadline") }}</span>
        </div>
        <div class="card-btn">
          <span @click="goTo('/cards', target.id)">{{ $t("coupon_btn_1") }}</span>
          <span @click="goTo('/coupon/give', target.id)">{{ $t("coupon_btn_2") }}</span>
        </div>
      </div>
    </div>

    <div class="coupon-card use" @click="selectClick(target)" v-else>
      <div class="coupon-num g-font-num">
        <span class="superscript">USDT</span>
        <span class="discount-num">{{ parseFloat(target.used_amount).toFixed(0) }}</span>
      </div>
      <div class="card-info">
        <div class="card-title">
          <span :class="$t('cn-show') + ' card-max'">{{ target.title }}</span>
          <span :class="$t('en-show') + ' card-max'">{{ target.title_en }}</span>
          <br />
          <span class="date card-data">{{ date }} {{ $t("coupon_deadline") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils/format';

export default {
  name: 'CouponCard',
  props: {
    target: {
      type: Object,
      require: true,
    },
    show: {
      type: Boolean,
      require: false,
    },
    status: {
      type: Number,
      require: false,
    },
    type: {
      type: String,
      require: false,
    },
  },
  methods: {
    goTo(str, id) {
      if (this.status === 5) return;
      this.$router.push({
        path: str,
        query: {
          coupon_id: id,
        },
      });
    },
    selectClick(item) {
      this.$emit('selectClick', item);
    },
  },
  computed: {
    date() {
      return parseTime(this.target.valid_end_time, '{y}-{m}-{d}');
    },
  },
};
</script>

<style lang="scss" scoped>
.coupon-card {
  display: flex;
  padding: 0.3rem 0.3rem;
  background: var(--color-white);
  border-radius: 0.2rem;
  margin-bottom: 0.2rem;
  opacity: 1;
  transform: opacity 0.2s;

  &[opacity="5"] {
    opacity: 0.5;
  }

  .coupon-num {
    font-size: 0.68rem;
    line-height: 0.96rem;
    color: var(--color-theme);
    font-weight: 600;
    font-family: "DINPro", "PingFang SC", 微软雅黑, 黑体, Microsoft YaHei, SimHei, "Open Sans",
      sans-serif;
    white-space: nowrap;
    overflow: hidden;

    .discount-num {
      width: 0.75rem;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      word-break: keep-all;
      line-height: 0.68rem;
      vertical-align: middle;
      text-align: center;
    }

    .superscript {
      font-size: 0.2rem;
      line-height: 0.7rem;
      vertical-align: top;
      font-weight: 400;
    }
  }

  .card-info {
    padding-top: 0.15rem;
    padding-left: 0.23rem;
  }

  .card-title {
    font-size: 0.26rem;
    font-family: "PingFang SC", 微软雅黑, 黑体, Microsoft YaHei, SimHei, "Open Sans";
    display: inline-block;
  }

  .card-max {
    display: inline-block;
    width: 2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-data {
    font-family: "DINPro", "PingFang SC", 微软雅黑, 黑体, Microsoft YaHei, SimHei, "Open Sans",
      sans-serif;
    margin-top: 0.5rem;
    font-size: 0.24rem;
    line-height: 0.36rem;
    color: var(--color-content);
  }

  .card-btn {
    float: right;
    margin-top: 0.16rem;

    span {
      margin-left: 0.16rem;
      padding: 0.1rem 0.17rem;
      font-size: 0.24rem;
      color: var(--color-theme);
      border: 1px solid var(--color-theme);
      border-radius: 0.08rem;
    }
  }

  &.use:hover {
    border: 1px solid rgba(64, 71, 214, 1);
  }
}
</style>
