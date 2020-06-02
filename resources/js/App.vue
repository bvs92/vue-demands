<template>
  <div id="app" class="container-sm">
    <vue-progress-bar></vue-progress-bar>
    <form-component v-if="getMode == 'create'"></form-component>
    <edit-demnad v-else></edit-demnad>
    <list-demands></list-demands>
  </div>
</template>

<script>
import FormComponent from './components/FormComponent.vue'
import EditDemand from './components/EditDemand.vue'
import ListDemands from './components/ListDemands.vue'
import { mapGetters } from 'vuex'


export default {
  name: 'App',
  components: {
    'form-component': FormComponent,
    'edit-demnad': EditDemand,
    'list-demands': ListDemands
  },

  computed: {
    ...mapGetters(['getAllDemands', 'getDemandsCount', 'getMode'])
  },

  // Lifecycle hooks
  created(){
    // console.log(this.getDemandsCount);
    
  },

  mounted(){
    //   this.getAllDemands;

    // Get all demands from DB
    this.$store.dispatch('fetchAllDemands');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
