<template>
  <div>
    <!-- <h2 class="title first">{{ $t("card_intro") }}</h2> -->
    <div class="box">
      <div>
        <span>account_bal_limit:</span>
        <span>{{ account_bal_limit }}</span>
      </div>
      <div>
        <span>bank_id:</span>
        <span>{{ bank_id }}</span>
      </div>
      <div>
        <span>card_network:</span>
        <span>{{ card_network }} USDT</span>
      </div>
      <div>
        <span>card_title:</span>
        <span>{{ card_title }}</span>
      </div>
      <div>
        <span>card_type:</span>
        <span>{{ card_type }}</span>
      </div>
      <div>
        <span>card_type_id:</span>
        <span>{{ card_type_id }}</span>
      </div>
      <div>
        <span>currency_type:</span>
        <span>{{ currency_type }}</span>
      </div>
      <div>
        <span>daily_recharge_limit:</span>
        <span>{{ daily_recharge_limit }}</span>
      </div>
      <div>
        <span>management_fee:</span>
        <span>{{ management_fee }}</span>
      </div>
      <div>
        <span>reg_fee:</span>
        <span>{{ reg_fee }}</span>
      </div>
      <div>
        <span>virtual_card:</span>
        <span>{{ virtual_card == 1 ? "实体卡" : "虚拟卡" }}</span>
      </div>
    </div>
    <div class="content">
      description:
      {{ description }}
    </div>
    <h2 class="title">{{ $t("apply_intro") }}</h2>
    <div class="intro">
      <div>{{ $t("apply_intro1") }}</div>
      <div>{{ $t("apply_intro2") }}</div>
      <div>{{ $t("apply_intro3") }}</div>
      <div>{{ $t("apply_intro4") }}</div>
      <div>{{ $t("apply_intro5") }}</div>
      <div>{{ $t("apply_intro6") }}</div>
    </div>
    <h2 class="title">{{ $t("trade_rule") }}</h2>
    <div class="intro">
      <!-- <div>{{ $t("trade_rule1") }}</div> -->
      <div>
        <span>
          {{ $t("trade_rules1") }}
        </span>
        <span>
          {{ management_fee }}
        </span>
        <span>
          {{ $t("trade_rules2") }}
        </span>
      </div>
      <div>
        <span>{{ $t("trade_rule2") }}</span>
        <span>{{ reg_fee }}</span>
        <span>
          {{ $t("trade_rules2") }}
        </span>
      </div>
      <div>{{ $t("trade_rule3") }}</div>
      <div>{{ $t("trade_rule4") }}</div>
      <div>{{ $t("trade_rule5") }}</div>
      <div>{{ $t("trade_rule6") }}</div>
    </div>
  </div>
</template>

<script>
import { Base64 } from 'js-base64';

export default {
  name: 'CardInfo',
  data() {
    return {
      description: '',
      account_bal_limit: '1000000',
      bank_id: '',
      card_network: '',
      card_title: '',
      card_type: '',
      card_type_id: '',
      currency_type: '',
      daily_recharge_limit: '',
      management_fee: '',
      reg_fee: '',
      virtual_card: 1,
    };
  },
  created() {
    const { data } = this.$route.query;
    const reldata = JSON.parse(Base64.decode(data));
    const {
      description,
      account_bal_limit,
      bank_id,
      card_network,
      card_title,
      card_type,
      card_type_id,
      currency_type,
      daily_recharge_limit,
      management_fee,
      reg_fee,
      virtual_card,
    } = reldata.result;
    this.description = description;
    this.account_bal_limit = account_bal_limit || '100000.00';
    this.bank_id = bank_id;
    this.card_network = card_network;
    this.card_title = card_title;
    this.card_type = card_type;
    this.card_type_id = card_type_id;
    this.currency_type = currency_type;
    this.daily_recharge_limit = daily_recharge_limit;
    this.management_fee = management_fee;
    this.reg_fee = reg_fee;
    this.virtual_card = virtual_card;
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 0;
  padding: 0;
  font-size: 0.5rem;
  line-height: 0.7rem;
  font-weight: 500;

  &:not(.first) {
    margin-top: 1.2rem;
  }
}

.box {
  margin-top: 0.4rem;
  padding: 0.3rem;
  background: #fafafa;
  font-size: 0.28rem;
  line-height: 0.5rem;
}

.content {
  margin-top: 0.5rem;
  font-size: 0.26rem;
  line-height: 0.37rem;
  word-wrap: break-word;
  color: var(--color-content);
}

.content__title {
  font-weight: 500;
  line-height: 0.6rem;
}

.intro {
  margin-top: 0.3rem;
  font-size: 0.28rem;
  line-height: 0.5rem;
}
</style>
