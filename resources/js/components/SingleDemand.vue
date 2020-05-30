<template>
    <div>
        <div class="card my-2">
            <div class="card-header">
                <button type="button" class="close float-right" aria-label="Close" @click="deleteItem(demand.id)">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="card-body">
                <h5 v-if="!demand.edit" class="card-title" @dblclick="editMode(demand)">{{ demand.first_name }} {{ demand.last_name }}</h5>
                
                <div class="row" v-else>
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
            </div><!-- end row -->

            <div class="row">
                    <div class="col-lg-6">
                    <div class="input-group mb-3" v-if="demand.edit">
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
                    <p v-else class="card-text">E-mail: {{ demand.email }}</p>
                    </div>

                    <div class="col-lg-6">
                    <div class="input-group mb-3" v-if="demand.edit">
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
                    <p v-else class="card-text">Oras: {{ demand.city }}</p>
                    </div>
            </div><!-- end row -->




                
                <a v-if="demand.edit" class="btn btn-success" @click="saveEdit(demand)">Salveaza modificarile</a>
                <a v-if="demand.edit" class="btn btn-default" @click="cancelEdit(demand)">Renunta</a>
            </div>
        </div><!-- end card -->
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, minLength, between, email } from 'vuelidate/lib/validators'


    export default {
        name: "SingleDemand",
        props: {
            demand: Object
        },

        data(){
            return {
                id: "",
                first_name: "",
                last_name: "",
                email: "",
                city: "",

                beforeEdit: {}
            }
        },

        validations: {
            first_name: {
            required,
            minLength: minLength(3)
            },

            last_name: {
            required,
            minLength: minLength(3)
            },

            email: {
            required,
            email
            },
            
            city: {
            required,
            minLength: minLength(3)
            }
        },

        computed: {
            ...mapGetters(['getMode'])
        },

        methods: {
            ...mapActions(['setSelectedDemand', 'changeMode', 'deleteTheDemand', 'updateDemand']),

            editMode(demand){
                console.log(demand.id);
                this.beforeEdit = demand;
                this.$store.dispatch('resetErrors');
                this.$v.$reset();
                demand.edit = true;
            },

            cancelEdit(demand){
                this.first_name = this.beforeEdit.first_name;
                this.last_name = this.beforeEdit.last_name;
                this.email = this.beforeEdit.email;
                this.city = this.beforeEdit.city;

                demand.edit = false;
            },

            saveEdit(demand){
                console.log("Before edit: " + this.beforeEdit.first_name);
                console.log(this.first_name);
                this.updateDemand({
                    id: demand.id,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    city: this.city
                });

                // demand.edit = false;
            },

            editDemand($event){
                // let eDemand = {
                //     id: this.demand.id,
                //     first_name: this.demand.first_name,
                //     last_name: this.demand.last_name,
                //     email: this.demand.email,
                //     city: this.demand.city
                // }
                // console.log($event.target);
                // console.log("id este: " + this.demand.id);
                this.setSelectedDemand(this.demand.id);
                this.changeMode();
                
            },

            deleteItem(id){
                this.deleteTheDemand(id);
            }
        },


        created(){
            this.id = this.demand.id;
            this.first_name = this.demand.first_name;
            this.last_name = this.demand.last_name;
            this.email = this.demand.email;
            this.city = this.demand.city;
        }
    }
</script>

<style scoped>

</style>