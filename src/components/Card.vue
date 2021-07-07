<template>
  <div class="card">
    <img class="logo" src="../assets/images/master.png" alt="MasterCard">
    <div class="tip">{{$t('card_number')}}</div>
    <div class="g-font-num number">
      <span v-if="isVisible&&realNumber">{{ realNumber | formatNumber }}</span>
      <span v-else>{{ no | formatNo }}</span>
      <template v-if="showEye">
        <img
          v-if="isVisible"
          class="number__eye"
          src="../assets/images/Visibility_on.svg"
          alt="hide"
          @click="isVisible=false"
        >
        <img
          v-else
          class="number__eye on"
          src="../assets/images/Visibility_off.svg"
          alt="show"
          @click="showRealNumber"
        >
      </template>
    </div>
    <div class="bottom">
      <div class="status" v-if="status===-1">{{$t('not_apply')}}</div>
      <div class="status" v-else-if="status===14">{{$t('apply_code_fail')}}</div>
      <div class="status" v-else-if="status===2">{{$t('apply_fail')}}</div>
      <div class="status" v-else-if="status!==1">{{$t('apply_pending')}}</div>
      <div class="num">
        <div v-if="firstName">{{ `${firstName} ${lastName}`}}</div>
        <div v-if="showBalance||value">
          <span v-if="isNaN(value)">N/A</span>
          <span v-else>{{value | formatValue}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCardRealNumber } from '@/api/data';

export default {
  name: 'Card',
  filters: {
    formatValue(val) {
      return `€${val.toLocaleString()}`;
    },
    formatNo(val) {
      return val ? `${val.substr(0, 4)} **** **** ${val.substr(-4, 4)}` : '8888 **** **** 8888';
    },
    formatNumber(val) {
      const label1 = val.substr(0, 4);
      const label2 = val.substr(4, 4);
      const label3 = val.substr(8, 4);
      const label4 = val.substr(-4, 4);
      return `${label1} ${label2} ${label3} ${label4}`;
    },
  },
  props: {
    no: {
      type: String,
      require: false,
      default: '',
    },
    logo: {
      type: String,
      require: false,
      default: '',
    },
    value: {
      type: Number,
      require: false,
      default: 0,
    },
    status: {
      type: Number, // 0 -未申请
      require: false,
      default: 0,
    },
    showBalance: {
      type: Boolean,
      require: false,
      default: false,
    },
    showEye: {
      type: Boolean,
      require: false,
      default: false,
    },
    firstName: {
      type: String,
      require: false,
      default: '',
    },
    lastName: {
      type: String,
      require: false,
      default: '',
    },
  },
  data() {
    return {
      isVisible: false,
      realNumber: '',
    };
  },
  methods: {
    fetchCardNumber() {
      getCardRealNumber(this.$route.query.no).then(({ result }) => {
        this.realNumber = result.card_number;
      });
    },
    showRealNumber() {
      if (!this.realNumber) {
        this.fetchCardNumber();
      }
      this.isVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
  .card {
    padding: .3rem .4rem;
    background: var(--color-theme);
    box-shadow: 0 .2rem .4rem 0 rgba(0, 0, 0, 0.05);
    border-radius: .2rem;
    color: #FFF;

    & + & {
      margin-top: .4rem;
    }
  }

  .logo {
    height: .5rem;
  }

  .tip {
    margin-top: .62rem;
    font-size: .26rem;
    line-height: .31rem;
    color: var(--color-content-white);
  }

  .number {
    margin-top: .1rem;
    font-size: .4rem;
    font-weight: 500;
    line-height: .51rem;

    span {
      vertical-align: middle;
    }
  }

  .number__eye {
    margin-left: .2rem;
    vertical-align: middle;
    height: .4rem;

    &.on {
      opacity: .3;
    }
  }

  .bottom {
    margin-top: .16rem;
    line-height: .46rem;
    height: .46rem;
  }

  .num {
    font-size: .26rem;
  }

  .status {
    box-sizing: border-box;
    height: .46rem;
    float: right;
    display: inline-block;
    padding: 0 .14rem;
    font-size: .24rem;
    line-height: .46rem;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, .3);
  }
</style>
