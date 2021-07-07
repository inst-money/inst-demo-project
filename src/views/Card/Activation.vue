<template>
  <div class="g-container">
    <Field
      v-model="form.email"
      :label="$t('email')"
      :placeholder="$t('enter_email')"
    />
    <EmailSend :email="form.email" :token.sync="form.emailToken" />
    <div class="upload">
      <div class="upload__title">{{ $t("id_front") }}</div>
      <PictureUploader :base64.sync="form.idFront" />
      <ul class="upload__tip">
        <li>{{ $t("id_tip1") }}</li>
        <li>{{ $t("id_tip2") }}</li>
        <li>{{ $t("id_tip3") }}</li>
      </ul>
    </div>
    <!-- <div class="upload">
      <div class="upload__title">{{ $t("id_hand") }}</div>
      <PictureUploader :base64.sync="form.idHand" />
      <ul class="upload__tip">
        <li>{{ $t("id_hand_tip1") }}</li>
        <li>{{ $t("id_hand_tip2") }}</li>
      </ul>
    </div> -->
    <Field
      v-model="form.emailCode"
      :label="$t('email_code')"
      :placeholder="$t('enter_email_code')"
    />
    <Button class="btn--next" @click="submit">{{ $t("ok") }}</Button>
  </div>
</template>

<script>
import Field from "@/components/Field.vue";
import EmailSend from "@/components/EmailSend.vue";
import PictureUploader from "@/components/PictureUploader.vue";
import Button from "@/components/Button.vue";

export default {
  name: "ApplicationAuth",
  components: { EmailSend, Button, PictureUploader, Field },
  data() {
    return {
      form: {
        email: "",
        idFront: "",
        emailCode: "",
      },
    };
  },
  methods: {
    submit() {},
  },
};
</script>

<style lang="scss" scoped>
.upload {
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.upload__title {
  margin-bottom: 0.4rem;
  font-size: 0.28rem;
  line-height: 0.4rem;
}

.upload__tip {
  margin: 0.3rem 0 0 0;
  padding: 0 0 0 0.3rem;
  font-size: 0.26rem;
  line-height: 0.44rem;
  color: var(--color-content);
}

.btn--next {
  margin: var(--space-bottom) 0;
}
</style>
