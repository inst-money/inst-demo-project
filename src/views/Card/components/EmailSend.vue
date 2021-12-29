<template>
  <Field class="email-send" :label="$t('send_email')" disable>
    <template v-slot:value>
      <Button
        v-if="status === 'before'"
        :label="$t('send')"
        type="link"
        @click="send"
      />
      <span class="email-send__label" v-else-if="status === 'sending'">{{
        $t("sending")
      }}</span>
      <span class="email-send__label" v-else-if="status === 'success'">
        {{ `${$t("send_success")} ${count}s` }}
      </span>
    </template>
  </Field>
</template>

<script>
import Field from '@/components/Field.vue';
import Button from '@/components/Button.vue';
import { sendSimpleEmail } from '@/api/user';

export default {
  name: 'EmailSend',
  components: { Button, Field },
  props: {
    email: {
      type: String,
      require: true,
    },
    token: {
      // sync
      type: String,
      require: true,
    },
    acct_no: {
      type: String,
      require: true,
    },
    card_type_id: {
      type: String,
      require: true,
    },
    cust_id: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      status: 'before', // sending, success
      count: 60,
      timer: null,
    };
  },
  methods: {
    send() {
      this.status = 'sending';
      const params = {
        email: this.email,
        acct_no: this.acct_no,
        card_type_id: this.card_type_id,
        cust_id: this.cust_id,
      };
      sendSimpleEmail(params)
        .then(({ result }) => {
          this.status = 'success';
          this.$emit('update:token', result);
          this.startCount();
        })
        .catch(() => {
          this.status = 'before';
        });
    },
    startCount() {
      this.timer = setInterval(() => {
        if (this.count <= 0) {
          clearInterval(this.timer);
          this.count = 60;
          this.status = 'before';
          return;
        }
        this.count -= 1;
      }, 1000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
  },
};
</script>

<style lang="scss" scoped>
.email-send__label {
  font-size: 0.28rem;
  line-height: 0.4rem;
  color: var(--color-content);
}
</style>
