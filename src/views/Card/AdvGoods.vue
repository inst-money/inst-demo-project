<template>
  <div class="g-container advCash-container">
    <div class="rows">
      <span class="input">商品名</span>
      <input type="text" :value="input1" class="input" :disabled="true" />
    </div>
    <Field
      type="select"
      v-model="from_currency"
      label="货币"
      placeholder="Currency"
      :options="amountOptions"
    />
    <div class="rows">
      <span class="input">价格</span>
      <input type="text" :value="currency_amount" class="input" />
    </div>
    <form method="post" action="https://wallet.advcash.com/sci/">
      <input type="hidden" name="ac_account_email" :value="ac_account_email" />
      <input type="hidden" name="ac_sci_name" :value="ac_sci_name" />
      <input type="hidden" name="ac_amount" :value="ac_amount" class="input" />
      <input
        type="hidden"
        name="ac_currency"
        :value="ac_currency"
        class="input"
      />
      <input
        type="hidden"
        name="ac_order_id"
        :value="ac_order_id"
        class="input"
      />
      <input type="hidden" name="ac_sign" :value="ac_sign" class="input" />
      <input
        type="hidden"
        name="ac_success_url"
        v-model="ac_success_url"
        :disabled="true"
      />
      <input
        type="hidden"
        name="ac_fail_url"
        v-model="ac_fail_url"
        :disabled="true"
      />
      <input
        type="hidden"
        name="ac_status_url"
        v-model="ac_status_url"
        :disabled="true"
      />
      <input type="submit" class="btn--next" />
    </form>
  </div>
</template>

<script>
import Field from "@/components/Field.vue";
import Button from "@/components/Button.vue";
import { advOrder } from "@/api/data";

export default {
  name: "ChooseRule",
  components: { Button, Field },
  data() {
    return {
      currency: "USD",
      currency_amount: "",
      from_currency: "",
      to_coin: "",
      approx: "",
      checked: false,
      ac_account_email: "",
      ac_sci_name: "",
      ac_amount: "",
      ac_fail_url: "https://store.sandbox.inst.money/",
      ac_order_id: "",
      ac_currency: "",
      ac_sign: "",
      ac_comments: "",
      ac_status_url: "https://store.sandbox.inst.money/",
      ac_success_url: "https://store.sandbox.inst.money/",
      amountOptions: [
        {
          value: "USD",
          label: "USD",
        },
        {
          value: "EUR",
          label: "EUR",
        },
        {
          value: "RUB",
          label: "RUB",
        },
      ],
    };
  },
  created() {
    this.to_coin = "BTC";
    this.currency_amount = 10;
    this.from_currency = "USD";
    this.referncePrice = "33604.5";
    this.input1 = "眼镜";
    this.input2 = "10";
    this.approx = "0.00029758";
    let params = {
      currency_amount: this.currency_amount,
      from_currency: this.from_currency,
      to_coin: this.to_coin,
      note: "",
    };
    advOrder(params).then((res) => {
      let response = res.result;
      this.ac_account_email = response.ac_account_email;
      this.ac_amount = response.ac_amount;
      this.ac_comments = response.ac_comments;
      this.ac_currency = response.ac_currency;
      this.ac_fail_url = response.ac_fail_url;
      this.ac_order_id = response.ac_order_id;
      this.ac_sci_name = response.ac_sci_name;
      this.ac_sign = response.ac_sign;
      this.ac_status_url = response.ac_status_url;
      this.ac_success_url = response.ac_success_url;
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.advCash-container {
  font-size: 16px;
  padding: 10px;
  input {
    width: 100%;
    display: block;
  }
}
h2 {
  font-size: 26px;
}
.table-container {
  display: flex;
  font-size: 12px;
}
.table-row {
  flex: 1;
  text-align: center;
}
.table-column {
  margin: 0 0 10px;
}
.table-column-buy {
  text-decoration: underline;
}
.input {
  width: 100%;
  outline: none;
  padding: 0;
  margin: 0;
  line-height: 0.4rem;
  font-size: 0.28rem;
  border: none;
  font-family: inherit;
  background: transparent;
  -webkit-tap-highlight-color: transparent;
  margin: auto;
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  &::placeholder {
    color: var(--color-des);
  }
}
.btn--next {
  margin: var(--space-bottom) 0;
  height: 0.8rem;
  line-height: 0.8rem;
  background: var(--color-theme);
  color: #fff;
  text-align: center;
  font-size: 0.28rem;
  font-weight: 500;
  border-radius: 0.4rem;
}
.checkBox {
  margin-top: 20px;
}
.rows {
  flex: 1;
  display: flex;
  flex-direction: row;
  span {
    flex: 1;
  }
  input {
    flex: 1;
  }
}
</style>
