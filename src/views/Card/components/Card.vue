<template>
  <div class="card">
    <img class="logo" src="@/assets/images/master.png" alt="MasterCard" />
    <div class="tip">{{ $t("card_number") }}</div>
    <div class="g-font-num number">
      <span>8888 **** **** 8888</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
};
</script>

<style lang="scss" scoped>
.card {
  padding: 0.3rem 0.4rem;
  background: var(--color-theme);
  box-shadow: 0 0.2rem 0.4rem 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.2rem;
  color: #fff;

  & + & {
    margin-top: 0.4rem;
  }
}

.logo {
  height: 0.5rem;
}

.tip {
  margin-top: 0.62rem;
  font-size: 0.26rem;
  line-height: 0.31rem;
  color: var(--color-content-white);
}

.number {
  margin-top: 0.1rem;
  font-size: 0.4rem;
  font-weight: 500;
  line-height: 0.51rem;

  span {
    vertical-align: middle;
  }
}

.number__eye {
  margin-left: 0.2rem;
  vertical-align: middle;
  height: 0.4rem;

  &.on {
    opacity: 0.3;
  }
}

.bottom {
  margin-top: 0.16rem;
  line-height: 0.46rem;
  height: 0.46rem;
}

.num {
  font-size: 0.26rem;
}

.status {
  box-sizing: border-box;
  height: 0.46rem;
  float: right;
  display: inline-block;
  padding: 0 0.14rem;
  font-size: 0.24rem;
  line-height: 0.46rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
