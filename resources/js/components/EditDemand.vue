<template>
  <div>
    <h2>Editeaza cerere</h2>
  <!-- <h3>Step: {{ step }}</h3> -->
  <form @submit.prevent="registerNewDemand()">
    <div><!-- start form fiv -->
      <!-- <div class="row" v-if="step == 1"> -->
      <div class="row">
        <div class="col-lg-6">
          <div class="input-group mb-3">
            <input type="text" 
             
            class="form-control" 
            name="first_name"
            placeholder="Nume" 
            v-model.trim="$v.first_name.$model" 
            :class="{ 'is-invalid': $v.first_name.$error, 'is-valid': !$v.first_name.$invalid }"
            style="width:100%;display:block;">
            <p style="width:100%;display:block;" class="invalid-feedback" v-if="this.$store.getters.getErrors.first_name">{{ this.$store.getters.getErrors.first_name[0] }}</p>
            <p style="width:100%;display:block;" class="invalid-feedback" v-if="!$v.first_name.required && this.$v.first_name.$dirty">Este obligatoriu.</p>
            <p style="width:100%;display:block;" class="invalid-feedback" v-if="!$v.first_name.minLength">Lungimea minima: {{$v.first_name.$params.minLength.min}} litere.</p>
            <p style="width:100%;display:block;" class="valid-feedback" v-if="!this.$v.first_name.$error && this.$v.first_name.$dirty">Totul arata ok.</p>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="input-group mb-3">
            <input type="text" 
             
            class="form-control" 
            name="last_name"
            placeholder="Prenume" 
            v-model.trim="$v.last_name.$model" 
            :class="{ 'is-invalid': $v.last_name.$error, 'is-valid': !$v.last_name.$invalid }"
            style="width:100%;display:block;">
            <p style="width:100%;display:block;" class="invalid-feedback" v-if="this.$store.getters.getErrors.last_name">{{ this.$store.getters.getErrors.last_name[0] }}</p>
            <p style="width:100%;display:block;" class="invalid-feedback" v-if="!$v.last_name.required && this.$v.last_name.$dirty">Este obligatoriu.</p>
            <p style="width:100%;display:block;" class="invalid-feedback" v-if="!$v.last_name.minLength">Lungimea minima: {{$v.last_name.$params.minLength.min}} litere.</p>
            <p style="width:100%;display:block;" class="valid-feedback" v-if="!this.$v.last_name.$error && this.$v.last_name.$dirty">Totul arata ok.</p>
          </div>
        </div>

        <!-- <div class="col-lg-12">
           <div class="form-group">
              <a class="btn btn-info my-2 btn-block" @click="nextStep()" v-show="showNext">Urmatorul</a>
          </div>
        </div> -->
      </div><!-- end row -->

      <!-- <div class="row" v-if="step == 2"> -->
      <div class="row">
        <div class="col-lg-6">
          <div class="input-group mb-3">
            <input type="email" 
             
            class="form-control" 
            name="email"
            placeholder="Adresa de e-mail" 
            v-model.trim="$v.email.$model" 
            :class="{ 'is-invalid': $v.email.$error, 'is-valid': !$v.email.$invalid }"
            style="width:100%;display:block;">
            <p style="width:100%;display:block;" class="invalid-feedback" v-if="this.$store.getters.getErrors.email">{{ this.$store.getters.getErrors.email[0] }}</p>
            <p style="width:100%;display:block;" class="invalid-feedback" v-if="!$v.email.required && this.$v.email.$dirty">Este obligatoriu.</p>
            <p style="width:100%;display:block;" class="invalid-feedback" v-if="!$v.email.email">Adresa nu este valida.</p>
            <p style="width:100%;display:block;" class="valid-feedback" v-if="this.$v.email.$dirty && !this.$v.email.$error">Totul arata ok.</p>
          </div>
        </div>

        
        <div class="col-lg-6">
          <div class="input-group mb-3">
            <input type="text" 
             
            class="form-control" 
            name="city"
            placeholder="Oras" 
            v-model.trim="$v.city.$model" 
            :class="{ 'is-invalid': $v.city.$error, 'is-valid': !$v.city.$invalid }"
            style="width:100%;display:block;">
            <p style="width:100%;display:block;" class="invalid-feedback" v-if="this.$store.getters.getErrors.city">{{ this.$store.getters.getErrors.city[0] }}</p>
            <p style="width:100%;display:block;" class="invalid-feedback" v-if="!$v.city.required && this.$v.city.$dirty">Este obligatoriu.</p>
            <p style="width:100%;display:block;" class="invalid-feedback" v-if="!$v.city.minLength">Lungimea minima: {{$v.city.$params.minLength.min}} litere.</p>
            <p style="width:100%;display:block;" class="valid-feedback" v-if="!this.$v.city.$error && this.$v.city.$dirty">Totul arata ok.</p>
          </div>
        </div>

        <div class="col-lg-6">
           <div class="form-group">
              <button type="submit" class="btn btn-success my-2 btn-block">Editeaza comanda</button>
          </div>
        </div>

        <div class="col-lg-6">
           <div class="form-group">
              <!-- <a class="btn btn-dark my-2 btn-block" @click="step--">Inapoi</a> -->
              <a class="btn btn-dark my-2 btn-block text-white" @click="resetFormFields()">Reseteaza</a>
          </div>
        </div>

      </div><!-- end row -->


    </div><!-- end form -->
  </form>


  </div>
</template>

<script>
import { required, minLength, between, email } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'



export default {
    name: "EditDemand",

    data(){
        return {
            // step: 1,
            demand: {
                id: "",
                first_name: "",
                last_name: "",
                email: "",
                city: ""
            },
            id: "",
            first_name: "",
            last_name: "",
            email: "",
            city: ""
        }
    },


    validations: {
    first_name: {
      required,
      minLength: minLength(1)
    },

    last_name: {
      required,
      minLength: minLength(1)
    },

    email: {
      required,
      email
    },
    
    city: {
      required,
      minLength: minLength(1)
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
    const edemand = this.getSelectedDemand;
    this.id = edemand.id;
    this.first_name = edemand.first_name;
    this.last_name = edemand.last_name;
    this.email = edemand.email;
    this.city = edemand.city;
  }


}
</script>