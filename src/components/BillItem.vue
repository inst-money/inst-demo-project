<template>
  <div class="deposit-record">
    <div>
      <div class="date">{{target.des}}</div>
      <div class="time">{{target.time}}</div>
    </div>
    <div>
      <div class="date count right">{{`€${target.amount}`}}</div>
      <div class="time type right">{{$t(`bill_type${target.type}`)}}</div>
    </div>
  </div>
</template>

<script>

import { parseTime } from '@/utils/format';

export default {
  name: 'BillItem',
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
    padding: .3rem;
    display: flex;
    justify-content: space-between;
    border-top: 1px dashed #F2F2F2;
  }

  .date {
    font-size: .32rem;
    line-height: .40rem;
    font-weight: 500;

    &.count {
      font-size: .34rem;
    }
  }

  .time {
    margin-top: .1rem;
    font-size: .28rem;
    line-height: .34rem;
    color: var(--color-content);
  }

  .right {
    text-align: right;
  }
</style>
