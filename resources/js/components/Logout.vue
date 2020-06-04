<template>

</template>


<script>
export default {
    name: "Logout",

    created(){
        this.$store.dispatch('logoutUser');
        this.$router.push({ path: '/' });
        // localStorage.removeItem('token');
    }

}
</script>