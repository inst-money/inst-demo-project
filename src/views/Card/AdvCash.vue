<template>
  <div class="g-container advCash-container">
    <p>
      Railone will transfer the cryptoto your Amount in 1~5 min,after you paying
      on Railone.
    </p>
    <div class="rows">
      <span class="input">Unit price</span>
      <input type="text" :value="input1" class="input" />
    </div>
    <div class="rows">
      <span class="input">Amount</span>
      <input type="text" :value="input2" class="input" />
    </div>
    <form method="post" action="https://wallet.advcash.com/sci/">
      <input type="hidden" name="ac_account_email" :value="ac_account_email" />
      <input type="hidden" name="ac_sci_name" :value="ac_sci_name" />
      <!-- <div class="rows">
        <span class="input">Amount</span>
        <input type="text" name="ac_amount" :value="ac_amount" class="input" />
      </div> -->
      <input type="hidden" name="ac_amount" :value="ac_amount" class="input" />
      <!-- <div class="rows">
        <span class="input">ac_currency</span>
        <input
          type="text"
          name="ac_currency"
          :value="ac_currency"
          class="input"
        />
      </div> -->
      <input
        type="hidden"
        name="ac_currency"
        :value="ac_currency"
        class="input"
      />
      <!-- <div class="rows">
        <span class="input">ac_order_id</span>
        <input
          type="text"
          name="ac_order_id"
          :value="ac_order_id"
          class="input"
        />
      </div> -->
      <input
        type="hidden"
        name="ac_order_id"
        :value="ac_order_id"
        class="input"
      />
      <!-- <div class="rows">
        <span class="input">ac_sign</span>
        <input type="text" name="ac_sign" :value="ac_sign" class="input" />
      </div> -->
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
      <div class="rows">
        <span class="input">comments</span>
        <input
          type="text"
          name="ac_comments"
          v-model="ac_comments"
          placeholder="ac_comments"
          class="input"
        />
      </div>

      <van-checkbox v-model="checked" shape="square" class="checkBox">
        I Underand that Railone is a 3rd party service provider. XXX will not
        take any responsibilityfor any loss or damage caused by the use of this
        service.</van-checkbox
      >

      <input type="submit" class="btn--next" :disabled="!checked" />
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
      currency_amount: "",
      from_currency: "",
      to_coin: "",
      approx: "",
      checked: false,
      ac_account_email: "",
      ac_sci_name: "",
      ac_amount: "",
      ac_fail_url: "",
      ac_order_id: "",
      ac_currency: "",
      ac_sign: "",
      ac_comments: "",
      ac_status_url: "",
      ac_success_url: "",
    };
  },
  created() {
    const { currency_amount, from_currency, to_coin, approx, referncePrice } =
      this.$route.query;
    this.to_coin = to_coin;
    this.currency_amount = currency_amount;
    this.from_currency = from_currency;
    this.referncePrice = referncePrice;
    this.input1 = referncePrice + to_coin;
    this.input2 = currency_amount + from_currency;
    this.approx = approx;
    let params = {
      currency_amount,
      from_currency,
      to_coin,
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
