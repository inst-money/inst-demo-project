<template>
  <div class="g-container">
    <Field
      disable
      v-model="form.firstName"
      :label="$t('real_first_name')"
      :placeholder="$t('enter_real_first_name')"
    />
    <Field
      disable
      v-model="form.lastName"
      :label="$t('real_last_name')"
      :placeholder="$t('enter_real_last_name')"
    />
    <Field
      type="date"
      v-model="form.birthday"
      :label="$t('birthday')"
      :placeholder="$t('select_birthday')"
    />
    <Field
      type="select"
      v-model="form.country"
      :label="$t('birth_country')"
      :placeholder="$t('select_birth_country')"
      :options="countryOptions"
    />
    <Field
      type="select"
      v-model="form.idType"
      :label="$t('id_type')"
      :placeholder="$t('select_id_type')"
      :options="idTypeOptions"
    />
    <Field
      v-model="form.id"
      :label="$t('id_number')"
      :placeholder="$t('enter_id_number')"
    />
    <div class="upload">
      <div class="upload__title">{{ $t("id_front") }}</div>
      <PictureUploader :base64.sync="form.idFront" />
      <ul class="upload__tip">
        <li>{{ $t("id_tip1") }}</li>
        <li>{{ $t("id_tip2") }}</li>
        <li>{{ $t("id_tip3") }}</li>
      </ul>
    </div>
    <div class="upload">
      <div class="upload__title">{{ $t("id_hand") }}</div>
      <PictureUploader :base64.sync="form.idHand" />
      <ul class="upload__tip">
        <li>{{ $t("id_hand_tip1") }}</li>
        <li>{{ $t("id_hand_tip2") }}</li>
      </ul>
    </div>
    <Button class="btn--next" :label="$t('next')" @click="submit" />
  </div>
</template>

<script>
import Field from "@/components/Field.vue";
import PictureUploader from "@/components/PictureUploader.vue";
import Button from "@/components/Button.vue";
import { submitKycAuth } from "@/api/data";
import countryList from "@/assets/country.json";

export default {
  name: "ApplicationAuth",
  components: { Button, PictureUploader, Field },
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        birthday: "",
        country: "",
        idType: "",
        id: "",
        idFront: "",
        idHand: "",
      },
      countryOptions: countryList.map((item) => ({
        value: item.countryCode,
        label: this.$i18n.locale === "zh" ? item.name_cn : item.name_en,
      })),
      idTypeOptions: [
        {
          label: this.$t("passport"),
          value: "passport",
        },
      ],
      paid: false,
    };
  },
  methods: {
    submit() {
      const params = {
        first_name: this.form.firstName,
        last_name: this.form.lastName,
        birthday: this.form.birthday,
        nationality: this.form.country,
        doc_no: this.form.id,
        doc_type: this.form.idType,
        card_type_id: this.$route.query.id,
        front_doc: this.form.idFront,
        mix_doc: this.form.idHand,
      };
      submitKycAuth(params)
        .then(() => {
          if (this.paid) {
            this.$router.push({
              path: "/apply/finish",
              query: {
                id: this.$route.query.id,
                no: this.$route.query.no,
              },
            });
          } else {
            this.$router.push({
              path: "/apply/pay",
              query: {
                id: this.$route.query.id,
                no: this.$route.query.no,
              },
            });
          }
        })
        .catch((err) => {
          if (err.message) {
            this.$toast(err.message);
          }
        });
    },
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
