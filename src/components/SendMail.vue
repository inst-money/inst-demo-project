<template>
  <a class="send-mail" href="mailto:support@railone.io">
    <img class="send-mail__icon" src="../assets/images/mail.svg" alt="email" />
  </a>
</template>

<script>
export default {
  name: 'SendMail',
};
</script>

<style lang="scss" scoped>
.send-mail {
  position: fixed;
  right: 0.4rem;
  bottom: 1.4rem;
  width: 1.1rem;
  height: 1.1rem;
  line-height: 1.1rem;
  text-align: center;
  background: rgba(86, 86, 86, 1);
  border-radius: 50%;
  text-decoration: none;
}

.send-mail__icon {
  vertical-align: middle;
  height: 0.4rem;
}
</style>
