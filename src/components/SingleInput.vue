<template>
  <div class="code-form">
    <input type="text" v-model="code" :placeholder="text" />
    <span class="sub-btn" @click="submitForm">{{ $t("ok") }}</span>
  </div>
</template>

<script>
export default {
  name: 'SingleInput',
  props: {
    text: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      code: '',
    };
  },
  methods: {
    submitForm() {
      this.$emit('submitForm', this.code);
    },
  },
};
</script>

<style lang="scss" scoped>
.code-form {
  position: relative;
  background: #ffffff;
  height: 1rem;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.8);
  border-radius: 0.14rem;

  input {
    background: transparent;
    margin-left: 0.1rem;
    padding: 0.3rem 0.2rem;
    font-size: 0.28rem;
    line-height: 0.29rem;
    border: none;
    width: 68%;
  }

  .sub-btn {
    position: absolute;
    display: inline-block;
    z-index: 1;
    right: 0;
    color: var(--color-theme);
    font-size: 0.32rem;
    margin: 0.3rem 0.4rem;
    padding-left: 0.4rem;
    border-left: 1px solid var(--color-content);
  }
}
</style>
