<template>
  <div>
    <h2 class="title first">{{$t('card_intro')}}</h2>
    <div class="box">
      <div>
        <span>{{$t('card_type')}}</span>
        <span>{{$t('virtual_card')}}</span>
      </div>
      <div>
        <span>{{$t('coin_type')}}</span>
        <span>{{$t('eur')}}</span>
      </div>
      <div>
        <span>{{$t('open_card_fee')}}</span>
        <span>{{ openCardFee }} USDT</span>
      </div>
      <div>
        <span>{{$t('balance_limit')}}</span>
        <span>100,000 EUR</span>
      </div>
    </div>
    <div class="content">
      <div>{{$t('intro_content1')}}</div>
      <div class="content__title">{{$t('intro_content2')}}</div>
      <div>{{$t('intro_content3')}}</div>
      <div class="content__title">{{$t('intro_content4')}}</div>
      <div>{{$t('intro_content5')}}</div>
      <div class="content__title">{{$t('intro_content6')}}</div>
      <div>{{$t('intro_content7')}}</div>
    </div>
    <h2 class="title">{{$t('apply_intro')}}</h2>
    <div class="intro">
      <div>{{ $t('apply_intro1')}}</div>
      <div>{{$t('apply_intro2')}}</div>
      <div>{{$t('apply_intro3')}}</div>
      <div>{{$t('apply_intro4')}}</div>
      <div>{{$t('apply_intro5')}}</div>
      <div>{{$t('apply_intro6')}}</div>
    </div>
    <h2 class="title">{{$t('trade_rule')}}</h2>
    <div class="intro">
      <div>{{$t('trade_rule1')}}</div>
      <div>
        <span>{{$t('trade_rule2')}}</span>
        <span>{{ loadingFeeRate }} %</span>
      </div>
      <div>{{$t('trade_rule3')}}</div>
      <div>{{$t('trade_rule4')}}</div>
      <div>{{$t('trade_rule5')}}</div>
      <div>{{ $t('trade_rule6')}}</div>
    </div>
  </div>
</template>

<script>

import { getCardTypeInfo } from '@/api/data';
import { getApiNumber, getApiPercent } from '@/utils';

export default {
  name: 'CardIntro',
  data() {
    return {
      openCardFee: '-',
      loadingFeeRate: '-',
    };
  },
  methods: {
    fetchInfo() {
      getCardTypeInfo(this.$route.query.id).then(({ result }) => {
        this.openCardFee = getApiNumber(result.open_card_fee);
        this.loadingFeeRate = getApiPercent(result.loading_rate);
      });
    },
  },
  mounted() {
    this.fetchInfo();
  },
};
</script>

<style lang="scss" scoped>
  .title {
    margin: 0;
    padding: 0;
    font-size: .5rem;
    line-height: .7rem;
    font-weight: 500;

    &:not(.first) {
      margin-top: 1.2rem;
    }
  }

  .box {
    margin-top: .4rem;
    padding: .3rem;
    background: #FAFAFA;
    font-size: .28rem;
    line-height: .5rem;
  }

  .content {
    margin-top: .5rem;
    font-size: .26rem;
    line-height: .37rem;
    color: var(--color-content);
  }

  .content__title {
    font-weight: 500;
    line-height: .6rem;
  }

  .intro {
    margin-top: .3rem;
    font-size: .28rem;
    line-height: .5rem;
  }
</style>
