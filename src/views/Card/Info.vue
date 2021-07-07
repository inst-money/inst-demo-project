<template>
  <div class="g-container apply-home">
    <Card />
    <CardInfo class="info" />
  </div>
</template>

<script>
import Card from "./components/Card.vue";
import CardInfo from "./components/CardInfo.vue";

export default {
  name: "CardIntroPage",
  components: { CardInfo, Card },
};
</script>

<style lang="scss" scoped>
.apply-home {
  padding-top: var(--space-top);
  padding-bottom: var(--padding-fixed-bottom);
}

.info {
  margin-top: 0.6rem;
}
</style>
