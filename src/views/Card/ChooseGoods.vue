<template>
  <div class="g-container">
    <SwitchLang />
    <div class="demo">{{ $t("demo") }}</div>
    <Button class="btn--next" :label="$t('choose1')" @click="buyCoin" />
    <Button
      class="btn--next"
      :label="$t('choose4')"
      @click="transcationCryptoCurrency"
    />
    <Button class="btn--next" :label="$t('choose2')" @click="buyGoods" />
    <Button
      class="btn--next"
      :label="$t('choose5')"
      @click="buyGoodsCurrency"
    />
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import SwitchLang from "@/components/SwitchLang.vue";
import { enc, HmacSHA256 } from "crypto-js";
import { getPaymentId } from "@/api/data";

export default {
  name: "ChooseRule",
  components: { Button, SwitchLang },
  data() {
    return {
      mobileLangValue: "",
    };
  },

  methods: {
    buyCoin() {
      this.$router.push({
        path: "/demo/chooseRule",
      });
    },
    buyGoods() {
      this.$router.push({
        path: "/demo/advGoods",
      });
    },
    buyGoodsCurrency() {
      console.log("111");
      let url = "/api/v1/payment";
      let apiKey = "9afacb15786843c1b91a58a755782fa1";
      let apiSecret = "f135dbea-9d66-4112-b3c4-18e5cea787f3";
      let params = {
        amount: "100.00",
        currency: "USD",
        cust_order_id: Date.now(),
        // customer: {
        //   acct_name: "test01@railone.io",
        //   acct_no: `mock${Date.now()}`,
        //   address: "street 1",
        //   birthday: "1991-01-01",
        //   city: "moon",
        //   country: "A",
        //   country_code: "96",
        //   doc_no: "1234",
        //   doc_type: "passport",
        //   first_name: "micky",
        //   gender: "male",
        //   kyc_info: "string",
        //   last_name: "Wang",
        //   maiden_name: "mom",
        //   mail: "test01@railone.io",
        //   mobile: "1582170000",
        //   nationality: "A",
        //   state: "moon",
        //   zipcode: "123456",
        // },
        return_url: window.location.href,
      };
      let generateAuth = this.generateAuth({
        method: "POST",
        apiKey,
        apiSecret,
        path: url,
        reqBody: params,
      });
      let authorization = generateAuth;
      getPaymentId(params, authorization).then((res) => {
        console.log("res===>", res);
      });
    },
    generateAuth(justPayObj) {
      const now = Date.now();
      let getSignature = `Inst:${justPayObj.apiKey}:${now}:${this.getSignature(
        justPayObj,
        now
      )}`;
      console.log("getSignature", getSignature);
      return getSignature;
    },
    getSignature({ method, apiKey, apiSecret, path, reqBody }, now) {
      const bodyStr = this.getBodyString(reqBody);
      const data = `${now}${method}${apiKey}${path}${bodyStr}`;
      const hash = HmacSHA256(data, apiSecret);
      console.log("bodyStr", bodyStr);
      console.log("data", data);
      console.log("hash", hash);
      return enc.Base64.stringify(hash);
    },
    getBodyString(reqBody) {
      if (reqBody) {
        const keys = Object.keys(reqBody).sort();
        return keys
          .reduce((result, cur) => `${result}&${cur}=${reqBody[cur]}`, "")
          .substring(1);
      }
      return "";
    },
    transcationCryptoCurrency() {
      // this.$router.push({
      //   path: "/demo/transactionCryptoCurrency",
      // });
      window.open(
        "https://buy.sandbox.inst.money/crypto?id=b5d0b997c2444eb98e26bd93e3f5fe48",
        "_blank"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.demo {
  font-size: 48px;
  text-align: center;
  font-weight: bold;
  margin-top: 40px;
}
.btn--next {
  margin: var(--space-bottom) 0;
}
</style>
