<template>
<div>
    <div class="card my-2">
            <div class="card-header">
                <button type="button" class="close float-right" aria-label="Close" @click="deleteItem(demand.id)">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <ValidationObserver ref="formComponent">
            <form @submit.prevent="saveEdit(demand)">
                <div class="card-body">
                    <h5 v-if="!demand.edit" class="card-title" @dblclick="editMode(demand)">{{ demand.first_name }} {{ demand.last_name }}</h5>
                    
                    <div class="row" v-else>
                        <div class="col-lg-6">
                        <div class="input-group mb-3">
                            <ValidationProvider rules="required|min:3|max:255" v-slot="v">
                            <input type="text" 

                            class="form-control" 
                            name="first_name"
                            placeholder="Nume" 
                            v-model.trim="first_name" 
                            :class="{ 'is-invalid': v.failed, 'is-valid': v.passed }"
                            style="width:100%;display:block;">
                            <span>{{ v.errors[0] }}</span>
                            </ValidationProvider>
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
                        </div>
                        </div>
                </div><!-- end row -->

                <div class="row">
                        <div class="col-lg-6">
                        <div class="input-group mb-3" v-if="demand.edit">
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
                        <p v-else class="card-text">E-mail: {{ demand.email }}</p>
                        </div>

                        <div class="col-lg-6">
                        <div class="input-group mb-3" v-if="demand.edit">
                            <ValidationProvider rules="required|min:3|max:255" v-slot="v">
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
                        <p v-else class="card-text">Oras: {{ demand.city }}</p>
                        </div>
                </div><!-- end row -->

                <button v-if="demand.edit" class="btn btn-success" type="submit">Salveaza modificarile</button>
                <a v-if="demand.edit" class="btn btn-default" @click="cancelEdit(demand)">Renunta</a>
                </div>
            </form>
            </ValidationObserver>
    </div><!-- end card -->
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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


        computed: {
            ...mapGetters(['getMode'])
        },

        methods: {
            ...mapActions(['setSelectedDemand', 'changeMode', 'deleteTheDemand', 'updateDemand']),

            editMode(demand){
                // console.log(demand.id);
                this.beforeEdit = demand;
                this.$store.dispatch('resetErrors');
                // this.$v.$reset();
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
                this.$Progress.start();
                // console.log("Before edit: " + this.beforeEdit.first_name);
                // console.log(this.first_name);

                this.$refs.formComponent.validate().then(success => {
                    if(!success){
                        return;
                    }


                    this.updateDemand({
                        id: demand.id,
                        first_name: this.first_name,
                        last_name: this.last_name,
                        email: this.email,
                        city: this.city
                    });
                    this.toastr('success', 'Cerre modificata cu success.');
                    this.$Progress.finish();

                    // Wait until the models are updated in the UI
                    this.$nextTick(() => {
                    this.$refs.formComponent.reset();
                    });

                });

                // console.log('AICI');
                

                // demand.edit = false;
            },

            editDemand($event){
                this.setSelectedDemand(this.demand.id);
                this.changeMode();
            },

            deleteItem(id){
                this.$Progress.start();
                this.deleteTheDemand(id).then((response) => {
                    this.toastr('success', 'Cerere eliminata cu succes.');
                    this.$Progress.finish();
                }).catch(err => this.$Progress.fail());
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

.input-group.mb-3 > span {
  width:100%;
}


</style>