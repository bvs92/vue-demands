<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">REFORMEX</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <router-link class="nav-item nav-link" to="/">Home</router-link>
                <router-link to="/form" class="nav-item nav-link">Form</router-link>
                <router-link to="/demands" class="nav-item nav-link" v-if="isLoggedIn">Demands</router-link>
                <router-link to="/login" class="nav-item nav-link" v-if="!isLoggedIn">Login</router-link>
                <router-link to="/register" class="nav-item nav-link" v-if="!isLoggedIn">Register</router-link>
                <router-link to="/logout" class="nav-item nav-link" v-if="isLoggedIn">Logout</router-link>
            <!-- <a class="nav-item nav-link" href="#">Features</a>
            <a class="nav-item nav-link" href="#">Pricing</a>
            <a class="nav-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> -->
            </div>
        </div>
</nav>
</template>


<script>
import {mapGetters} from 'vuex';

export default {
    name: "Navbar",

    computed: {
        ...mapGetters(['isLoggedIn'])
    }
}
</script>