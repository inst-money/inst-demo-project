<template>
  <iframe :src="url" height="1500" width="100%" frameBorder="0">
    <p>您的浏览器暂不支持 iframe 标签。</p>
  </iframe>
</template>

<script>
export default {
  name: 'TransactionCryptoCurrency',
  data() {
    return {
      url: 'https://buy.sandbox.inst.money/crypto?id=b5d0b997c2444eb98e26bd93e3f5fe48',
    };
  },
  methods: {},
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
