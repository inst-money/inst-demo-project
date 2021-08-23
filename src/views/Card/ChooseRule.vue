<template>
  <div class="g-container">
    <Field
      type="select"
      v-model="form.buy"
      label="Buy Coin"
      placeholder="Coin"
      :options="BuyOptions"
    />
    <Field
      type="select"
      v-model="form.currency"
      label="Choose Currency"
      placeholder="Currency"
      :options="amountOptions"
    />
    <input
      type="number"
      v-model="form.amount"
      label="Currency Amount"
      placeholder="Currency Amount"
      class="input"
      onkeyup="var p2 = parseFloat(value).toFixed(2);value = p2>=0?(/\.0?$/.test(value)?value:p2.replace(/0$/,'').replace(/\.0$/,'')):''"
      onblur="value = value.replace(/\.0*$/,'')"
    />
    <!-- <Field
      type="select"
      v-model="form.method"
      label="Payment Method"
      placeholder="Payment Method"
      :options="methodOptions"
    /> -->
    <Button
      class="btn--next"
      label="Search"
      @click="search"
      :disable="searchDisabled"
    />

    <h2>BEST OFFER</h2>
    <div class="table-container">
      <iframe
        :src="redirect_url"
        height="715"
        width="1280"
        frameBorder="0"
        v-if="redirect_url"
      >
        <p>您的浏览器暂不支持 iframe 标签。</p>
      </iframe>
    </div>
  </div>
</template>

<script>
import Field from "@/components/Field.vue";
import Button from "@/components/Button.vue";
import { searchRates } from "@/api/data";

export default {
  name: "ChooseRule",
  components: { Button, Field },
  data() {
    return {
      form: {
        buy: "USDT",
        amount: "31",
        currency: "USD",
        method: "",
      },
      approx: 0,
      referncePrice: 0,
      BuyOptions: [{ value: "USDT", label: "USDT" }],
      offerDisplay: false,
      amountOptions: [
        {
          value: "USD",
          label: "USD",
        },
        {
          value: "EUR",
          label: "EUR",
        },
      ],
      methodOptions: [
        {
          label: "visa",
          value: "visa",
        },
      ],
    };
  },
  computed: {
    searchDisabled() {
      if (!this.form.buy || !this.form.currency || !this.form.amount) {
        return true;
      }
      return false;
    },
  },
  methods: {
    randomString(e) {
      e = e || 32;
      var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
      let i;
      for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
      return n;
    },
    search() {
      let auth =
        "Inst:b5d0b997c2444eb98e26bd93e3f5fe48:" +
        Date.now() +
        ":yYXX2O6Pn0PVFDpXeSYodHrlUk5URKrO2akSH4drLJ0=";
      let params = {
        from_currency: this.form.currency,
        to_coin: this.form.buy,
        authorization: auth,
        amount: this.form.amount,
        buy_crypto: this.form.buy,
        currency: this.form.currency,
        return_url: "https://sandbox.inst.money/status.html",
        cust_order_id: this.randomString(10),
      };
      searchRates(params).then((res) => {
        window.open(res.result.redirect_url, "_self");
      });
    },
    buy() {
      this.$router.push({
        path: "/card/pay",
        query: {
          currency_amount: this.form.amount,
          from_currency: this.form.currency,
          to_coin: this.form.buy,
          approx: this.approx,
          referncePrice: this.referncePrice,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn--next {
  margin: var(--space-bottom) 0;
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
.aStyle {
  color: blue;
}
.number__eye {
  width: 30px;
  height: 30px;
}
</style>
