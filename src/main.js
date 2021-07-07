import Vue from 'vue';
import toast from '@/components/toast';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/utils/resize';
import '@/styles/index.scss';
import i18n from './i18n';
import '@/plugins/vant';

Vue.use(toast);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
