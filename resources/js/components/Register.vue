<template>
<div>
    <div class="alert alert-danger" role="alert" v-if="errors && errors.length > 0">
        <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
    </div>
<ValidationObserver v-slot="{ handleSubmit }" ref="formComponent">
    <form @submit.prevent="handleSubmit(register)">
        <div class="form-group">
            <label for="name">Name</label>
            <ValidationProvider rules="required|min:3" v-slot="v">
                <input type="text" class="form-control" id="name" aria-describedby="emailHelp" v-model.trim="name"
                :class="{ 'is-invalid': v.failed, 'is-valid': v.passed }"
                style="width:100%;display:block;">
                <span>{{ v.errors[0] }}</span>
            </ValidationProvider>
        </div>

        <div class="form-group">
            <label for="email">Email address</label>
             <ValidationProvider rules="required|email" v-slot="v">
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model.trim="email"
                :class="{ 'is-invalid': v.failed, 'is-valid': v.passed }"
                style="width:100%;display:block;">
                <span>{{ v.errors[0] }}</span>
            </ValidationProvider>
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
             <ValidationProvider rules="required|min:5" v-slot="v">
            <input type="password" class="form-control" id="password" v-model.trim="password"
                :class="{ 'is-invalid': v.failed, 'is-valid': v.passed }"
                style="width:100%;display:block;">
                <span>{{ v.errors[0] }}</span>
            </ValidationProvider>
        </div>
        <!-- <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div> -->
        <button type="submit" class="btn btn-primary">Register</button>
    </form>
</ValidationObserver>
</div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
    name: "Register",
    data(){
        return {
            name: "",
            email: "",
            password: "",
            errors: []
        }
    },

    computed:{
        ...mapGetters(['getErrors']),
    },

    methods: {
        register(){
            let user = {
                name: this.name,
                email: this.email,
                password: this.password
            }

            // console.log(user);
            this.$Progress.start();

            this.$store.dispatch('registerUser', user).then(response => {
                this.toastr('success', 'Utilizator inregistrat cu succes.');
                this.resetAll();
                this.$Progress.finish();
                this.$router.push({ path: '/' });
            }).catch(err => {
                // console.log(err);
                this.errors = this.getErrors;
                this.password = "";
                this.$Progress.fail();
                this.$refs.formComponent.reset();
            });

            
        },

        resetAll(){
            this.name = "";
            this.email = "";
            this.password = "";
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

    }

}
</script>