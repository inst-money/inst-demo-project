<template>
  <div class="switch-lang">
    <Button type="link" :label="$t('switch_lang')" />
    <select :value="lang" class="select--native" @input="handleInput">
      <option value="zh">中文</option>
      <option value="en">English</option>
    </select>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'SwitchLang',
  components: { Button },
  computed: {
    lang() {
      return this.$i18n.locale;
    },
  },
  methods: {
    handleInput(e) {
      const val = e.target.value;
      if (!val) {
        return;
      }
      this.$i18n.locale = val;
      localStorage.setItem('locale', val);
    },
  },
};
</script>

<style lang="scss" scoped>
.switch-lang {
  position: relative;
  display: inline-block;
}

.select--native {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  -webkit-tap-highlight-color: transparent;
  border: none;
}
</style>
