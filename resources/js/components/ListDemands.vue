<template>
    <div>
        <h2 style="font-size:24px;text-align:left;" class="mt-4">Lista cereri</h2>
        <hr>
        <p>Numar cereri inregistrate: <strong>{{ getDemandsCount }}</strong></p>

        <div v-if="getDemandsCount > 0">
            <scale-loader v-if="loading" :color="color"></scale-loader>
            <div v-else>
                <single-demand v-for="demand in getAllDemands" :key="demand.id" :demand="demand"></single-demand>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SingleDemand from './SingleDemand';
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';
import axios from 'axios';

export default {
    name: "list-demands",

    components: {
        'single-demand': SingleDemand,
        ScaleLoader
    },

    data(){
        return {
            loading: true,
            color: '#52A6AC',
            demands: []
        }
    },

    methods: {
        
    },

    computed: {
        ...mapGetters(['getAllDemands', 'getDemandsCount'])
    },

    created(){
        // this.$store.dispatch('fetchAllDemands').then((response) => {
        //     this.demands = response
        //         setTimeout(() => {
        //             this.loading = false;
        //         }, 1000);
        // });
        setTimeout(() => {
            this.loading = false;
        }, 1000);


    }
}
</script>




<style scoped>

</style>