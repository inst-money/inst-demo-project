<template>
  <transition name="nou-toast-fade" @after-leave="handleAfterLeave">
    <div v-show="show" class="nou-toast" :class="{ danger: type === 'danger' }" :style="style">
      {{ text }}
    </div>
  </transition>
</template>

<script>
/**
 * @author yuanzeyu
 * @date 2020-01-17
 * @desc
 */
export default {
  name: 'NouToast',
  computed: {
    style() {
      return {
        top: `${this.top}px`,
      };
    },
  },
  data() {
    return {
      text: '',
      duration: 5000,
      uid: '',
      onClose: null,
      timer: null,
      show: false,
      top: 40,
      id: '',
      type: 'primary', // primary/danger
    };
  },
  methods: {
    resetTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.closeMessage();
      }, this.duration);
    },
    closeMessage() {
      if (this.onClose) {
        this.onClose();
      }
      this.handleClose();
      this.show = false;
    },
    handleAfterLeave() {
      this.$el.parentNode.removeChild(this.$el);
      this.$destroy();
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  mounted() {
    this.show = true;
    this.$nextTick(() => {
      this.resetTimer();
    });
  },
};
</script>

<style lang="scss" scoped>
.nou-toast {
  z-index: 999;
  box-sizing: border-box;
  opacity: 1;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  line-height: 0.4rem;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 0.2rem 0.4rem;
  min-width: 70%;
  text-align: center;
  font-weight: 500;
  font-size: 0.28rem;
  transition: top 0.3s ease;

  &.danger {
    background: #cf5e5e;
  }
}

.nou-toast-fade-enter,
.nou-toast-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -100%);
}

.nou-toast-fade-enter-active,
.nou-toast-fade-leave-active {
  transition: all 0.3s ease;
}
</style>
