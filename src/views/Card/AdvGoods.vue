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
      <input
        type="text"
        v-model.trim="ac_amount"
        class="input"
        oninput="value=value.toString().match(/^\d+(?:\.\d{0,2})?/)"
      />
    </div>
    <div class="rows">
      <span class="input">名字</span>
      <input type="text" v-model="name" class="input" />
    </div>
    <div class="rows">
      <span class="input">邮箱</span>
      <input type="text" v-model="email" class="input" />
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
      <Button class="btn--next" label="确认" @click="onsubmits" />
    </form>
  </div>
</template>

<script>
import Field from "@/components/Field.vue";
import Button from "@/components/Button.vue";
import { advOrder, advPayment } from "@/api/data";

export default {
  name: "ChooseRule",
  components: { Button, Field },
  data() {
    return {
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
      ],
    };
  },
  created() {
    this.to_coin = "BTC";
    this.from_currency = "USD";
    this.referncePrice = "33604.5";
    this.input1 = "眼镜";
    this.input2 = "10";
    this.approx = "0.00029758";
  },
  methods: {
    async onsubmits(e) {
      let auth =
        "Inst:b5d0b997c2444eb98e26bd93e3f5fe48:" +
        Date.now() +
        ":yYXX2O6Pn0PVFDpXeSYodHrlUk5URKrO2akSH4drLJ0=";
      // let params = {
      //   amount: this.ac_amount,
      //   currency: this.from_currency,
      //   cust_order_id: Date.now(),
      //   authorization: auth,
      // };
      // await advOrder(params).then((res) => {
      //   let response = res.result;
      //   this.ac_order_id = response.order_id;
      //   this.ac_sign = response.data.signature;
      // });
      // this.$refs.formRef.submit();
      //获取订单url
      let params = {
        amount: this.ac_amount,
        currency: this.from_currency,
        cust_order_id: Date.now(),
        customer: {
          email: this.email,
          name: this.name,
        },
        return_url: window.location.href,
      };
      let heareds = {
        authorization: auth,
      };
      advPayment(params, heareds).then((res) => {
        if (res.code === 0) {
          let response = res.result;
          let url = response.redirect_url;
          window.location.href = url;
        }
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
</style>
