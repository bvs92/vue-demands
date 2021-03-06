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

import VueProgressBar from 'vue-progressbar'


import VueSweetalert2 from 'vue-sweetalert2';
 
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

 

// import Vuelidate from 'vuelidate'
// Vue.use(Vuelidate)

// import VeeValidate from 'vee-validate'
// Vue.use(VeeValidate)

Vue.use(VueSweetalert2);
Vue.use(VueProgressBar, {
    color: 'rgb(53, 140, 85)',
    failedColor: 'red',
    height: '3px'
  })

import { ValidationProvider, ValidationObserver, ErrorBag } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.component('pulse-loader', require('vue-spinner/src/PulseLoader.vue'));



import { extend } from 'vee-validate';

import { required, email, min, max, min_value, integer } from 'vee-validate/dist/rules';

// No message specified.
extend('email', {
  ...email,
  message: 'Adresa e-mail nu este valida.'
});

// Override the default message.
extend('required', {
  ...required,
  message: 'Campul este obligatoriu.'
});

extend('min', {
    ...min,
    message: 'Lungimea minima este de {length} caractere.'
  });


extend('max', {
...max,
message: 'Lungimea maxima este de {length} caractere.'
});

extend('min_value', {
    ...min_value,
    message: 'Invalid.'
  });

  extend('integer', {
    ...integer,
    message: 'Valoare invalida.'
  });


import VueRouter from 'vue-router'

Vue.use(VueRouter)

// const FormComponent = { template: '<div>Home</div>' }

import FormComponent from './components/FormComponent.vue'
import ListDemands from './components/ListDemands.vue'
import HomeComponent from './components/HomeComponent.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Logout from './components/Logout.vue'

Vue.component('HomeComponent', HomeComponent);
Vue.component('FormComponent', FormComponent);
Vue.component('ListDemands', ListDemands);
Vue.component('Login', Login);
Vue.component('Register', Register);
Vue.component('Logout', Logout);

// 2. Define some routes
const routes = [
  { 
    path: '/', 
    component: HomeComponent 
  },
  { path: '/form', component: FormComponent },
  { 
    path: '/demands', 
    component: ListDemands,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/login', 
    component: Login,
    meta: { requiresVisitor: true } 
   },
  { 
    path: '/register', 
    component: Register,
    meta: { requiresVisitor: true } 
   },
  { 
    path: '/logout', 
    component: Logout,
    meta: { requiresAuth: true } 
   },
]

// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes, // short for `routes: routes`,
//   mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.isLoggedIn) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})



Vue.config.productionTip = false

// const app = new Vue({
//     el: '#app',
// });

const app = new Vue({
    store,
    render: h => h(App),
    router
  }).$mount('#app')