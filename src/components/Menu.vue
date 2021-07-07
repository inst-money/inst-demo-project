<template>
  <div class="menu" :style="style">
    <div class="menu-list" v-if="isLoading">
      <div class="menu-title">
        {{ $t("menu_my") }}
      </div>
      <div class="menu-item">
        <a :label="$t('switch_lang')" @click="Openpanel()">
          <span class="iconfont">&#xe642;</span>
          {{ $t("menu_lang") }}
        </a>
        <ul class="lang-switch" v-if="isOpen" :value="lang" @click="handleLang">
          <li lang="zh">中文</li>
          <li lang="en">English</li>
        </ul>
      </div>
      <div class="menu-item">
        <a @click="goTo('/coupon')">
          <span class="iconfont">&#xe67a;</span>
          {{ $t("menu_code") }}
        </a>
      </div>
      <div class="menu-item">
        <a @click="goTo('/userinfo')">
          <span class="iconfont">&#xe716;</span>
          {{ $t("menu_user") }}
        </a>
      </div>
      <div class="menu-item">
        <a @click="goTo('/feedback')">
          <span class="iconfont">&#xe700;</span>
          {{ $t("menu_feedback") }}
        </a>
      </div>
    </div>
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
    margin-top: 1px;
    margin-left: 0.1rem;
    padding: 0.3rem 0.2rem;
    background: #fff;
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
