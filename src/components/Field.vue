<template>
  <div class="field">
    <div class="label">
      <span>{{ label }}</span>
      <slot name="label" />
    </div>
    <div class="input__wrapper">
      <slot name="value">
        <div
          v-if="type === 'select'"
          class="select--view"
          :class="{ fill: value.length > 0 }"
        >
          <span class="select__value" v-if="value">{{ getLabel(value) }}</span>
          <span v-else>{{ placeholder }}</span>
          <img src="@/assets/images/arrow-right.svg" alt="select" />
          <select :value="value" class="select--native" @input="handleInput">
            <option value="" key="empty">{{ $t("select_empty") }}</option>
            <option
              v-for="item in options"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="select--view" v-else-if="type === 'date'">
          <span v-if="value" class="select__value">
            {{ value || placeholder }}
          </span>
          <span v-else>{{ placeholder }}</span>
          <input
            :value="value"
            @input="handleInput"
            class="select--native date"
            type="date"
            :placeholder="placeholder"
            autocomplete="off"
          />
        </div>
        <template v-else>
          <span class="value" v-if="disable">{{ value }}</span>
          <input
            v-else
            :value="value"
            @input="handleInput"
            @blur="handleBlur"
            class="input"
            type="text"
            :placeholder="placeholder"
            autocomplete="off"
          />
        </template>
      </slot>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Field',
  props: {
    value: {
      type: String,
      require: true,
    },
    label: {
      type: String,
      require: true,
    },
    type: {
      type: String, // input select
      require: false,
      default: 'input',
    },
    placeholder: {
      type: String,
      require: false,
      default: '',
    },
    options: {
      type: Array,
      require: false,
      default: null,
    },
    disable: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
    handleBlur(e) {
      this.$emit('blur', e.target.value);
    },
    getLabel(val) {
      const exist = this.options.find((item) => item.value === val);
      return exist ? exist.label : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.field {
  padding: 0.4rem 0;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.label {
  font-size: 0.28rem;
  line-height: 0.4rem;
}

.input__wrapper {
  flex: 1;
  padding-left: 0.4rem;
  text-align: right;
}

.value {
  width: 100%;
  text-align: right;
  line-height: 0.4rem;
  font-size: 0.28rem;
}

.input {
  width: 100%;
  text-align: right;
  outline: none;
  padding: 0;
  margin: 0;
  line-height: 0.4rem;
  font-size: 0.28rem;
  border: none;
  font-family: inherit;
  background: transparent;
  -webkit-tap-highlight-color: transparent;

  &::placeholder {
    color: var(--color-des);
  }
}

.select--view {
  position: relative;
  width: 100%;
  font-size: 0.28rem;
  line-height: 0.4rem;
  color: var(--color-des);

  .select__value {
    color: #000;
  }

  span {
    vertical-align: middle;
  }

  img {
    margin-left: 0.2rem;
    margin-top: 0.1rem;
    height: 0.2rem;
    vertical-align: top;
  }
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

  &.date {
    left: initial;
  }
}
</style>
