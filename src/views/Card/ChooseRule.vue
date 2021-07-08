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
    <div class="table-container" v-if="offerDisplay">
      <div class="table-row">
        <div class="table-column">Name</div>
        <div class="table-column">
          <img
            class="number__eye"
            src="../../assets/images/instLogo.png"
            alt="hide"
          />
        </div>
      </div>
      <div class="table-row">
        <div class="table-column">Approx</div>
        <div class="table-column">{{ approx }}</div>
      </div>
      <div class="table-row">
        <div class="table-column">Refernce price</div>
        <div class="table-column">{{ referncePrice }}</div>
      </div>
      <div class="table-row">
        <div class="table-column">Transaction</div>
        <div class="table-column table-column-buy" @click="buy">
          <a class="aStyle">BUY</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Field from "@/components/Field.vue";
import Button from "@/components/Button.vue";
import BigNumber from "bignumber.js";
import { searchRates } from "@/api/data";

export default {
  name: "ChooseRule",
  components: { Button, Field },
  data() {
    return {
      form: {
        buy: "BTC",
        amount: "10",
        currency: "USD",
        method: "",
      },
      approx: 0,
      referncePrice: 0,
      BuyOptions: [
        { value: "LTC", label: "LTC" },
        { value: "BTC", label: "BTC" },
      ],
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
        {
          value: "RUB",
          label: "RUB",
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
      console.log("this.form", this.form);
      if (!this.form.buy || !this.form.currency || !this.form.amount) {
        return true;
      }
      return false;
    },
  },
  methods: {
    search() {
      let params = {
        from_currency: this.form.currency,
        to_coin: this.form.buy,
      };
      searchRates(params).then((res) => {
        this.offerDisplay = true;
        console.log("res", res);
        this.referncePrice = res.result;
        this.approx = BigNumber(this.form.amount)
          .dividedBy(BigNumber(res.result))
          .toFixed(8);
      });
    },
    buy() {
      this.$router.push({
        path: "/card/advCash",
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
