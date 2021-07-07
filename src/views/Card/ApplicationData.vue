<template>
  <div class="g-container">
    <Field
      v-model="form.last_name"
      :label="$t('real_first_name')"
      :placeholder="$t('enter_real_first_name')"
    />
    <Field
      v-model="form.last_name"
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
      v-model="form.doc_type"
      :label="$t('id_type')"
      :placeholder="$t('select_id_type')"
      :options="idTypeOptions"
    />
    <Field
      v-model="form.doc_no"
      :label="$t('id_number')"
      :placeholder="$t('enter_id_number')"
    />
    <div class="upload">
      <div class="upload__title">{{ $t("id_front") }}</div>
      <PictureUploader :base64.sync="form.front_doc" />
      <ul class="upload__tip">
        <li>{{ $t("id_tip1") }}</li>
        <li>{{ $t("id_tip2") }}</li>
        <li>{{ $t("id_tip3") }}</li>
      </ul>
    </div>
    <div class="upload">
      <div class="upload__title">{{ $t("id_hand") }}</div>
      <PictureUploader :base64.sync="form.mix_doc" />
      <ul class="upload__tip">
        <li>{{ $t("id_hand_tip1") }}</li>
        <li>{{ $t("id_hand_tip2") }}</li>
      </ul>
    </div>
    <Field
      type="select"
      v-model="form.gender"
      :label="$t('gender')"
      :placeholder="$t('select_gender')"
      :options="genderOptions"
    />
    <Field
      type="select"
      v-model="form.country"
      :label="$t('country')"
      :placeholder="$t('select_country')"
      :options="countryOptions"
    />
    <Field
      v-model="form.state"
      :label="$t('province')"
      :placeholder="$t('enter_province')"
    />
    <Field
      v-model="form.city"
      :label="$t('city')"
      :placeholder="$t('enter_city')"
    />
    <Field
      v-model="form.address"
      :label="$t('address')"
      :placeholder="$t('enter_address')"
    />
    <Field
      v-model="form.zipcode"
      :label="$t('zipcode')"
      :placeholder="$t('enter_zipcode')"
    />
    <Field
      v-model="form.mobile"
      :label="$t('tel')"
      :placeholder="$t('enter_tel')"
    >
      <template v-slot:label>
        <div class="tel-area">
          <div class="tel-area__view">
            <span>{{ form.telArea }}</span>
            <img src="../../assets/images/down.svg" alt="select" />
          </div>
          <select v-model="form.telArea" class="tel-area__select">
            <option
              v-for="item in telAreaOptions"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>
        </div>
      </template>
    </Field>
    <Field
      v-model="form.mail"
      :label="$t('email')"
      :placeholder="$t('enter_email')"
    />
    <EmailSend
      :email="form.mail"
      :acct_no="acct_no"
      :card_type_id="form.card_type_id"
      :cust_id="cust_id"
      :token.sync="form.emailToken"
    />
    <Field
      v-model="form.emailCode"
      :label="$t('email_code')"
      :placeholder="$t('enter_email_code')"
    />
    <Button class="btn--next" @click="submitKyc">{{ $t("ok") }}</Button>
  </div>
</template>

<script>
import { Base64 } from "js-base64";
import { submitSimpleKycData } from "@/api/data";
import { formatDate } from "@/utils/format";
import Field from "@/components/Field.vue";
import Button from "@/components/Button.vue";
import EmailSend from "./components/EmailSend.vue";
import countryList from "@/assets/country.json";
import PictureUploader from "@/components/PictureUploader.vue";

export default {
  name: "ApplicationData",
  components: { EmailSend, Button, Field, PictureUploader },
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        birthday: "",
        nationality: "",
        doc_type: "",
        doc_no: "",
        card_type_id: "",
        front_doc: "",
        mix_doc: "",
        gender: "",
        country: "",
        state: "",
        city: "",
        address: "",
        country_code: "",
        zipcode: "",
        telArea: "+86",
        mobile: "",
        mail: "",
        emailCode: "",
        emailToken: "",
      },
      acct_id: "",
      acct_name: "",
      acct_no: "",
      active_doc: "",
      agent_id: "",
      auditor: "",
      back_doc: "",
      bank_id: "",
      cust_id: "",
      card_no: "",
      card_number: "",
      maiden_name: "",
      cust_tx_id: "",
      create_time: "",
      pep: 0,
      reason: "",
      response: "",
      status: 0,
      update_time: "",
      idTypeOptions: [
        {
          label: this.$t("passport"),
          value: "passport",
        },
      ],
      genderOptions: [
        {
          label: this.$t("male"),
          value: "male",
        },
        {
          label: this.$t("female"),
          value: "female",
        },
      ],
      countryOptions: countryList.map((item) => ({
        value: item.countryCode,
        label: this.$i18n.locale === "zh" ? item.name_cn : item.name_en,
      })),
      telAreaOptions: countryList.map((item) => ({
        value: `+${item.code}`,
        label: `+${item.code} ${
          this.$i18n.locale === "zh" ? item.name_cn : item.name_en
        }`,
      })),
    };
  },
  created() {
    // this.$i18n.locale = "en";
    // localStorage.setItem("locale", en);
    const { data } = this.$route.query;
    let reldata = JSON.parse(Base64.decode(data));
    const {
      first_name,
      last_name,
      birthday,
      country,
      doc_type,
      doc_no,
      card_type_id,
      front_doc,
      back_doc,
      mix_doc,
      gender,
      state,
      city,
      address,
      zipcode,
      country_code,
      mobile,
      mail,
      acct_id,
      acct_no,
      cust_id,
      maiden_name,
      acct_name,
      active_doc,
      agent_id,
      card_no,
      card_number,
      create_time,
      pep,
      reason,
      response,
      status,
      update_time,
      nationality,
      cust_tx_id,
      auditor,
    } = reldata.result;
    this.acct_id = acct_id;
    this.form.first_name = first_name;
    this.form.last_name = last_name;
    this.form.birthday = formatDate(birthday);
    this.form.country = country;
    this.form.doc_type = doc_type;
    this.form.nationality = nationality;
    this.form.doc_no = doc_no;
    this.form.card_type_id = card_type_id;
    this.form.front_doc = front_doc;
    this.form.mix_doc = mix_doc;
    this.form.gender = gender;
    this.form.state = state;
    this.form.city = city;
    this.form.address = address;
    this.form.zipcode = zipcode;
    this.form.country_code = country_code;
    this.form.mobile = mobile;
    this.form.mail = mail;
    this.acct_no = acct_no;
    this.cust_id = cust_id;
    this.maiden_name = maiden_name;
    this.cust_tx_id = cust_tx_id;
    this.acct_name = acct_name;
    this.active_doc = active_doc;
    this.agent_id = agent_id;
    this.auditor = auditor;
    this.back_doc = back_doc;
    this.card_no = card_no;
    this.card_number = card_number;
    this.create_time = create_time;
    this.pep = pep;
    this.reason = reason;
    this.response = response;
    this.status = status;
    this.update_time = update_time;
  },
  methods: {
    submitKyc() {
      if (!this.form.emailToken) {
        this.$toast(this.$t("click_send"));
        return;
      }
      const params = {
        cust_id: this.cust_id,
        acct_id: this.acct_id,
        acct_name: this.acct_name,
        acct_no: this.acct_no,
        active_doc: this.active_doc,
        address: this.form.address,
        agent_id: this.agent_id,
        auditor: this.auditor,
        back_doc: this.back_doc,
        birthday: this.form.birthday,
        card_no: this.card_no,
        card_number: this.card_number,
        card_type_id: this.form.card_type_id,
        city: this.form.city,
        country: this.form.country,
        country_code: this.form.country_code,
        create_time: this.create_time,
        cust_tx_id: this.cust_tx_id,
        doc_no: this.form.doc_no,
        doc_type: this.form.doc_type,
        first_name: this.form.first_name,
        front_doc: this.form.front_doc,
        gender: this.form.gender,
        kyc_info: "",
        last_name: this.form.last_name,
        maiden_name: this.maiden_name,
        mail: this.form.mail,
        mail_token: this.form.emailToken,
        mail_verification_code: this.form.emailCode,
        mix_doc: this.form.mix_doc,
        mobile: this.form.mobile,
        nationality: this.form.nationality,
        pep: this.pep,
        poa_doc: [],
        poa_docs: "",
        reason: this.reason,
        response: this.response,
        state: this.form.state,
        status: this.status,
        update_time: this.update_time,
        zipcode: this.form.zipcode,
      };
      submitSimpleKycData(params)
        .then((res) => {
          if (res.code == 0) {
            this.$router.push({
              path: "/card/application/result",
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
.btn--next {
  margin: var(--space-bottom) 0;
}

.tel-area {
  position: relative;
  margin-left: 0.2rem;
  display: inline-block;
  box-sizing: border-box;
  width: 1.1rem;
  height: 0.4rem;
  line-height: 0.4rem;
}

.tel-area__view {
  border: 1px solid var(--color-theme);
  border-radius: 2px;
  padding: 0 0.1rem;

  span {
    font-size: 0.24rem;
  }

  img {
    margin-top: 0.15rem;
    float: right;
    width: 0.12rem;
  }
}

.tel-area__select {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
}
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
</style>
