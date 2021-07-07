<template>
  <div class="deposit-record">
    <div>
      <div class="date">
        {{ date }}
        <span v-if="target.coupon" class="coupon">
          {{ $t("coupon") }}-{{ target.coupon.discount_amount }}{{ target.coupon.coin_type }}
        </span>
      </div>
      <div class="time">{{ time }}</div>
    </div>
    <div>
      <div class="date count right">{{ `+${target.amount} USDT` }}</div>
      <div class="time right">
        <span v-if="target.status === 1">{{ $t("charge_success") }}</span>
        <span v-else-if="target.status === 2 || target.status === 5">{{ $t("charge_fail") }}</span>
        <span v-else>{{ $t("wait_process") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils/format';

export default {
  name: 'DepositRecord',
  props: {
    target: {
      type: Object,
      require: true,
    },
  },
  filters: {
    formatStatus(val) {
      if (val === 1) {
        return this.$t('charge_success');
      }
      if (val === 2 || val === 5) {
        return this.$t('charge_fail');
      }
      return this.$t('wait_process');
    },
  },
  computed: {
    date() {
      return parseTime(this.target.time, '{y}-{m}-{d}');
    },
    time() {
      return parseTime(this.target.time, '{h}:{i}:{s}');
    },
  },
};
</script>

<style lang="scss" scoped>
.deposit-record {
  padding: 0.3rem;
  display: flex;
  justify-content: space-between;
  border-top: 1px dashed #f2f2f2;
}

.date {
  font-size: 0.32rem;
  line-height: 0.4rem;
  font-weight: 500;

  &.count {
    font-size: 0.34rem;
  }
}

.time {
  margin-top: 0.1rem;
  font-size: 0.28rem;
  line-height: 0.34rem;
  color: var(--color-content);
}

.right {
  text-align: right;
}

.coupon {
  display: inline-block;
  border: 1px solid var(--color-coupon);
  color: var(--color-coupon);
  border-radius: 0.1rem;
  height: 0.2rem;
  line-height: 0.22rem;
  font-size: 0.2rem;
  padding: 0.08rem 0.08rem;
  margin-left: 0.15rem;
  vertical-align: bottom;
}
</style>
