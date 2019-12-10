import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import vueHeadful from 'vue-headful'
import Toasted from 'vue-toasted'
import VueResource from 'vue-resource';
import { i18n } from '@/plugins/i18n';
import Vuex from 'vuex';
import store from './store'
import smfRowCountSelector from "@/components/smf-row-count-selector";

Vue.config.productionTip = false;
Vue.component("vue-headful", vueHeadful);
Vue.component('smf-row-count-selector', smfRowCountSelector);
Vue.use(Toasted);
Vue.use(VueResource);
//Vue.use(VueAnalytics, {
//  id: 'UA-111467685-1',
//  router,
//  debug: {
//    sendHitTask: process.env.NODE_ENV === 'production'
//  }
//})

// Let's Register a Global Error Notification Toast.
Vue.toasted.register(
  "sml_attention_error",
  msg => msg,
  {
      type: "error",
      duration: 4000, //  milliseconds
      action: {
          text: "Cancel",
          onClick: (e, toastObject) => {
              toastObject.goAway(0);
          }
      },
      theme: "bubble",
      closeOnSwipe: true,
      position: 'bottom-center'
  }
);
Vue.toasted.register(
  "sml_attention_ok",
  msg => msg,
  {
      type: "success",
      duration: 4000, //  milliseconds
      action: {
          text: "OK",
          onClick: (e, toastObject) => {
              toastObject.goAway(0);
          }
      },
      theme: "bubble",
      closeOnSwipe: true,
      position: 'bottom-center'
  }
);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

const data = {
    name: 'Alfred',
    lastAccess: '2019-12-10 17:20:33.00000000',
    modules: {
        devices: {
            priv: [
                4,
                'delete',
                'edit'
            ]
        },
        meters: {
            actions: [
                'view'
            ]
        }
    }
};
