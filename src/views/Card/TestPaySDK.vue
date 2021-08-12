<template>
  <div class="paySDKContainer">
    <form ref="formRef">
      <div>
        <label for="cc-number">Card number</label>
        <span id="cc-number">
          <!-- MoonPay SDK iframe for card number field will be here! -->
        </span>
      </div>
      <div>
        <label for="cc-cvc">CVC</label>
        <span id="cc-cvc">
          <!-- MoonPay SDK iframe for CVC field will be here! -->
        </span>
      </div>
      <div>
        <label for="cc-expiration">Expiration date</label>
        <span id="cc-expiration">
          <!--MoonPay SDK iframe for expiration date field will be here! -->
        </span>
      </div>
      <!--Submit credit card form button-->
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import MoonPay from "@moonpay/browser";

export default {
  name: "testPaySDK",
  data() {
    return {
      form: null,
    };
  },
  created() {
    MoonPay.initialize("pk_test_kRUbJHo4W4CPYg1SLfYJst6LAVL3qic");
    MoonPay.trackPageView();
    this.$ref.form = MoonPay.createCardDetailsForm((state) => {
      //  Example of the `state` object:
      //  {
      //    "number": {
      //      "isDirty": false,
      //      "isFocused": false,
      //      "errorMessages": [
      //        "is required"
      //      ],
      //      "isValid": false,
      //      "name": "number",
      //      "isEmpty": true
      //    },
      //    ...
      //  }
    });
    form.createField("#cc-number", {
      type: "card-number",
      name: "number",
      css: {
        fontFamily:
          "system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
        fontSize: "16px",
        lineHeight: "18px",
      },
      placeholder: "4111 1111 1111 1111",
      validations: ["required", "validCardNumber"],
    });

    // form.createField("#cc-expiration", {
    //   type: "card-expiration-date",
    //   name: "expiryDate",
    //   css: {
    //     fontFamily:
    //       "system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    //     fontSize: "16px",
    //     lineHeight: "18px",
    //   },
    //   placeholder: "01 / 23",
    //   validations: ["required", "validCardExpirationDate"],
    // });

    // form.createField("#cc-cvc", {
    //   type: "card-security-code",
    //   name: "cvc",
    //   css: {
    //     fontFamily:
    //       "system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    //     fontSize: "16px",
    //     lineHeight: "18px",
    //   },
    //   placeholder: "123",
    //   validations: ["required", "validCardSecurityCode"],
    // });
  },
  methods: {
    handleSubmit(event) {
      console.log("123", event);
      event.preventDefault();
      form.submit(
        {
          street: "123 Mission St",
          subStreet: null,
          town: "San Francisco",
          postCode: "94105",
          state: "CA",
          country: "USA",
        },
        (status, response) => {
          console.log("response", response);
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.paySDKContainer {
  font-size: 16px;
}
</style>
