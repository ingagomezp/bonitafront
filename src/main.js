import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.config.productionTip = false;
const options = {
  confirmButtonColor: '#1976D2',
  cancelButtonColor: '#ff7674',
};
Vue.use(VueSweetalert2, options);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
