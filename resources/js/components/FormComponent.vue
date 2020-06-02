<template>
  <div>
    <h2>Inregistreaza o noua cerere</h2>
  <!-- <h3>Step: {{ step }}</h3> -->
  <ValidationObserver v-slot="{ handleSubmit }" ref="formComponent">
    <form @submit.prevent="handleSubmit(registerNewDemand)">
    <div><!-- start form fiv -->
      <!-- <div class="row" v-if="step == 1"> -->
      <div class="row">
        <div class="col-lg-6">
          <div class="input-group mb-3">
             <ValidationProvider rules="required|min:3|max:255" v-slot="v">
              <input type="text" 
                  class="form-control" 
                  name="first_name"
                  placeholder="Nume" 
                  v-model="first_name" 
                  :class="{ 'is-invalid': v.failed, 'is-valid': v.passed }"
                  style="width:100%;display:block;">
              <span>{{ v.errors[0] }}</span>
              <!-- {{ v.failed }} -->

            </ValidationProvider>
            <!-- <p style="width:100%;display:block;" class="invalid-feedback" v-if="this.$store.getters.getErrors.first_name">{{ this.$store.getters.getErrors.first_name[0] }}</p> -->
          </div>
        </div>

        <div class="col-lg-6">
          <div class="input-group mb-3">
             <ValidationProvider rules="required|min:3|max:255" v-slot="v">
            <input type="text" 
             
            class="form-control" 
            name="last_name"
            placeholder="Prenume" 
            v-model.trim="last_name" 
            :class="{ 'is-invalid': v.failed, 'is-valid': v.passed }"
            style="width:100%;display:block;">
            <span>{{ v.errors[0] }}</span>
             </ValidationProvider>
            <!-- <p style="width:100%;display:block;" class="invalid-feedback" v-if="this.$store.getters.getErrors.last_name">{{ this.$store.getters.getErrors.last_name[0] }}</p> -->
            <!-- <p style="width:100%;display:block;" class="invalid-feedback" v-if="!$v.last_name.required && this.$v.last_name.$dirty">Este obligatoriu.</p>
            <p style="width:100%;display:block;" class="invalid-feedback" v-if="!$v.last_name.minLength">Lungimea minima: {{$v.last_name.$params.minLength.min}} litere.</p>
            <p style="width:100%;display:block;" class="valid-feedback" v-if="!this.$v.last_name.$error && this.$v.last_name.$dirty">Totul arata ok.</p> -->
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
             <ValidationProvider rules="required|min:3|max:255" v-slot="v">
            <input type="email" 
             
            class="form-control" 
            name="email"
            placeholder="Adresa de e-mail" 
            v-model.trim="email" 
            :class="{ 'is-invalid': v.failed, 'is-valid': v.passed }"
            style="width:100%;display:block;">
            <span>{{ v.errors[0] }}</span>
             </ValidationProvider>
          </div>
        </div>

        
        <div class="col-lg-6">
          <div class="input-group mb-3">
             <ValidationProvider rules="required:min:3" v-slot="v">
            <input type="text" 
             
            class="form-control" 
            name="city"
            placeholder="Oras" 
            v-model.trim="city" 
            :class="{ 'is-invalid': v.failed, 'is-valid': v.passed }"
            style="width:100%;display:block;">
            <span>{{ v.errors[0] }}</span>
             </ValidationProvider>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="input-group mb-3">
             <ValidationProvider rules="required|min:9" v-slot="v">
            <input type="text" 
             
            class="form-control" 
            name="phone"
            placeholder="Telefon" 
            v-model.trim="phone" 
            :class="{ 'is-invalid': v.failed, 'is-valid': v.passed }"
            style="width:100%;display:block;">
            <span>{{ v.errors[0] }}</span>
             </ValidationProvider>
          </div>
        </div>

        <div class="col-lg-6">
          
          <div class="input-group mb-3">

             <ValidationProvider rules="required|min_value:1|integer" v-slot="v">
                <select class="custom-select" name="category_id" 
                v-model.trim="category_id" v-if="getCategoriesCount > 0"  
                :class="{ 'is-invalid': v.failed, 'is-valid': v.passed }"
                >
                  <option selected="selected" value="">Selecteaza o categorie</option>
                  <option v-for="cat in getAllCategories" :value="cat.id" :key="cat.id">{{ cat.usage_name }}</option>
                </select>
            <span>{{ v.errors[0] }}</span>
             </ValidationProvider>
             <!-- <p>Categoir: {{ category_id }}</p> -->
          </div>
        </div>

        <div class="col-lg-6">
           <div class="form-group">
              <button type="submit" class="btn btn-info my-2 btn-block">Inregistreaza comanda</button>
          </div>
        </div>

        <div class="col-lg-6">
           <div class="form-group">
              <!-- <a class="btn btn-dark my-2 btn-block" @click="step--">Inapoi</a> -->
              <a class="btn btn-dark my-2 btn-block text-white" @click="resetFormFields()">Reseteaza</a>
          </div>
        </div>

      </div><!-- end row -->

  <!-- <button @click="showAlert">Show</button> -->
    </div><!-- end form -->
  </form>
  </ValidationObserver>


  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
// import { mapGetters } from 'vuex';
// uuidv4(); 
// import { required, minLength, between, email } from 'vuelidate/lib/validators'


export default {
  name: 'FormComponent',
  props: {},
  data() {
    return {
      step: 1,
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      city: "",
      phone: "",
      category_id: ''

      // demand: {
      //   id: "",
      //   first_name: "",
      //   last_name: "",
      //   email: "",
      //   city: ""
      // }


    }
  },

  computed: {
    ...mapGetters(['getAllCategories', 'getCategoriesCount'])
  },



  methods: {
    ...mapActions(['registerDemand']),

    showCount(){
    //    console.log('aici');
    // console.log(this.getCategoriesCount);
    // console.log(this.getAllCategories);
    // console.log('end aici');
    },

    showAlert() {
      // Use sweetalert2
      this.$swal('Hello Vue world!!!');
    },


    registerNewDemand(){

      this.$Progress.start();

      // this.$v.$touch()
      // Define new demand with inputs from form
      let newDemand = {
        // id: uuidv4(),
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        city: this.city,
        phone: this.phone,
        category_id: this.category_id
      }

      // console.log(newDemand);

      // Send demand to Vuex
      this.registerDemand(newDemand).then((response) => {
        // console.log('response.status');
        this.toastr('success', 'Cerere inregistrata cu succes.')
        this.$Progress.finish();
        this.resetFormFields();
      }).catch(err => {
        // console.log('ERRRRR');
        // console.log(err);
        this.$Progress.fail();
      });


  // this.$store.getters.getErrors.forEach(err => console.log(err));
  

    }, // end registerNewDemand


    resetFormFields(){
      this.first_name = "";
      this.last_name = "";
      this.email = "";
      this.city = "";
      this.phone = "";
      this.category = "";

      this.$refs.formComponent.reset();
    },

    nextStep(){
      if(!this.$v.first_name.$invalid)
        this.step++;

    },

    toastr(theType = 'success', msg){
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', this.$swal.stopTimer)
          toast.addEventListener('mouseleave', this.$swal.resumeTimer)
        }
      })

    Toast.fire({
      icon: theType,
      title: msg
    })

      // this.$swal('Hello Vue world!!!');
    },


  },



  mounted(){

  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.input-group.mb-3 > span {
  width:100%;
}

</style>
