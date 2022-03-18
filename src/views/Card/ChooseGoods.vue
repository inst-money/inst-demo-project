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

    <input type="text" v-model="iframeUrl" class="input" />
    <Button class="btn--next" label="确定" @click="openIframe" />
    <div :v-if="showIframe">
      <iframe
        :src="iframeUrl"
        id="iframe_moonPay"
        height="800"
        width="1000"
        frameBorder="0"
      >
        <p>您的浏览器暂不支持 iframe 标签。</p>
      </iframe>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import SwitchLang from "@/components/SwitchLang.vue";

export default {
  name: "ChooseRule",
  components: { Button, SwitchLang },
  data() {
    return {
      mobileLangValue: "",
      showIframe: false,
      iframeUrl: "",
    };
  },

  methods: {
    openIframe() {
      this.showIframe = true;
    },
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
      console.log("111", window.grecaptcha);
      window.grecaptcha.enterprise.ready(async () => {
        console.log(222);
        const token = await window.grecaptcha.enterprise.execute(
          "6LcIqtYdAAAAAL846puTq7Zz_bad2j4wa_8awl3i",
          { action: "LOGIN" }
        );
        console.log("token", token);
      });
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
</style>
