/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');


// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

import Vue from 'vue'
import App from './App.vue'
import store from './store'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)


Vue.config.productionTip = false

// const app = new Vue({
//     el: '#app',
// });

const app = new Vue({
    store,
    render: h => h(App)
  }).$mount('#app')