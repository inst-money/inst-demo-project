<template>
  <div class="g-container advCash-container">
    <Field
      type="select"
      v-model="from_currency"
      label="Currency"
      placeholder="Currency"
      :options="amountOptions"
    />
    <div class="rows">
      <span class="input">Amount</span>
      <input
        type="text"
        v-model.trim="ac_amount"
        class="input"
        oninput="value=value.toString().match(/^\d+(?:\.\d{0,2})?/)"
      />
    </div>
    <div class="orderSty">
      <span>Order Number: </span>
      <CopyInfo :label="orderNumberUrl" />
    </div>
    <form method="post" action="https://wallet.inst.money/sci/" ref="formRef">
      <input type="hidden" name="ac_ps" value="MASTERCARD" />
      <input type="hidden" name="ac_account_email" value="josh_chow@163.com" />
      <input type="hidden" name="ac_sci_name" value="inst.money" />
      <input type="hidden" name="ac_amount" v-model="ac_amount" class="input" />
      <input
        type="hidden"
        name="ac_currency"
        :value="from_currency"
        class="input"
      />
      <input
        type="hidden"
        name="ac_order_id"
        :value="ac_order_id"
        class="input"
      />
      <input type="hidden" name="ac_sign" v-model="ac_sign" class="input" />
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
      <Button
        class="btn--next"
        label="Confirm"
        @click="onsubmits"
        :loading="loading"
      />
    </form>
  </div>
</template>

<script>
import { enc, HmacSHA256 } from "crypto-js";
import Field from "@/components/Field.vue";
import Button from "@/components/Button.vue";
import CopyInfo from "@/components/CopyInfo.vue";
import { justPayAdvPayment } from "@/api/data";

export default {
  name: "ChooseRule",
  components: { Button, Field, CopyInfo },
  data() {
    return {
      loading: false,
      name: "",
      email: "",
      currency: "USD",
      currency_amount: "",
      from_currency: "",
      to_coin: "",
      approx: "",
      checked: false,
      ac_account_email: "",
      ac_sci_name: "",
      ac_amount: 8,
      ac_fail_url: "https://store.sandbox.inst.money/fail.html",
      ac_order_id: "",
      ac_currency: "",
      ac_sign: "",
      ac_comments: "",
      ac_status_url: "https://store.sandbox.inst.money/status.html",
      ac_success_url: "https://store.sandbox.inst.money/success.html",
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
        {
          value: "RP",
          label: "RP",
        },
      ],
      orderNumberUrl: "",
    };
  },
  created() {
    this.to_coin = "BTC";
    this.from_currency = "USD";
    this.referncePrice = "33604.5";
    this.input1 = "Goods";
    this.input2 = "10";
    this.approx = "0.00029758";
  },
  methods: {
    getBodyString(reqBody) {
      if (reqBody) {
        const keys = Object.keys(reqBody).sort();
        return keys
          .reduce((result, cur) => `${result}&${cur}=${reqBody[cur]}`, "")
          .substring(1);
      }
      return "";
    },
    getSignature({ method, apiKey, apiSecret, path, reqBody }, now) {
      const bodyStr = this.getBodyString(reqBody);
      const data = `${now}${method}${apiKey}${path}${bodyStr}`;
      const hash = HmacSHA256(data, apiSecret);
      return enc.Base64.stringify(hash);
    },
    generateAuth(railoneObj) {
      const now = Date.now();
      return `Inst:${railoneObj.apiKey}:${now}:${this.getSignature(
        railoneObj,
        now
      )}`;
    },
    async onsubmits(e) {
      this.loading = true;
      const params = {
        expire: Date.now() + 30 * 24 * 60 * 60 * 1000,
        amount: this.ac_amount,
        currency: this.from_currency,
        cust_order_id: Date.now(),
        return_url: window.location.href,
      };
      var apiKey = "bd30eba11d394b36b8cdf20fb1879385";
      var apiSecret = "684f9f41-cfab-47dd-8fc4-982625ebf851";
      var url = "/api/v1/payment";
      var auth = this.generateAuth({
        method: "POST",
        apiKey: apiKey,
        apiSecret: apiSecret,
        path: url,
        reqBody: params,
      });
      // 获取justPay订单url
      const heareds = {
        authorization: auth,
        "Access-Passphrase": "12345678a",
      };
      justPayAdvPayment(params, heareds)
        .then((res) => {
          this.loading = false;
          if (res.code === 0) {
            const response = res.result;
            this.orderNumberUrl = response.redirect_url;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    toChecked() {
      return false;
    },
  },
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
.orderSty {
  display: flex;
  margin-top: 20px;
  span {
    height: 42px;
    line-height: 42px;
    margin-right: 24px;
  }
}
</style>
