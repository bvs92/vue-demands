<template>
  <div>
    <h2>Editare</h2>

  <!-- <button @click="getDemand">Selected is</button> -->

  <!-- <h3>Step: {{ step }}</h3> -->
    <div>
      <!-- <div class="row" v-if="step == 1"> -->
      <div class="row" v-if="step == 1">
        <div class="col-lg-6">
          <input type="text" class="form-control" placeholder="Nume" v-model="demand.first_name">
        </div>
        <div class="col-lg-6">
          <input type="text" class="form-control" placeholder="Prenume" v-model="demand.last_name">
        </div>
        <div class="col-lg-6">
           <div class="form-group">
              <button class="btn btn-info my-2 btn-block" @click="step++">Urmatorul</button>
          </div>
        </div>
      </div><!-- end row -->

      <div class="row" v-if="step == 2">
        <div class="col-lg-6">
          <input type="email" class="form-control" placeholder="E-mail" v-model="demand.email">
        </div>
        <div class="col-lg-6">
          <input type="text" class="form-control" placeholder="Oras" v-model="demand.city">
        </div>

        <div class="col-lg-6">
           <div class="form-group">
              <button @click="updateDemand" class="btn btn-success my-2 btn-block">Modifica comanda</button>
          </div>
        </div>

        <div class="col-lg-6">
           <div class="form-group">
              <button class="btn btn-dark my-2 btn-block" @click="step--">Inapoi</button>
          </div>
        </div>

      </div><!-- end row -->


    </div><!-- form -->
 


  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "EditDemand",

    data(){
        return {
            step: 1,
            demand: {
                id: "",
                first_name: "",
                last_name: "",
                email: "",
                city: ""
            }
        }
    },

    
  computed: {
    ...mapGetters(['getSelectedDemand', 'getSelectedDemand'])
  },

  methods: {
    ...mapActions(['updateTheDemand', 'changeMode']),
    getDemand(){
      console.log(this.getSelectedDemand);
      
    },

    updateDemand(){
      this.updateTheDemand(this.demand);
      this.changeMode();
    }
  },



  mounted(){
    this.demand = this.getSelectedDemand;
  }


}
</script>