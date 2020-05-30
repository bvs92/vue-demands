<template>
    <div>
        <h2 style="font-size:24px;text-align:left;" class="mt-4">Lista cereri</h2>
        <hr>
        <p>Numar cereri inregistrate: <strong>{{ getDemandsCount }}</strong></p>
        <div v-if="getDemandsCount > 0">
            <single-demand v-for="demand in getAllDemands" :key="demand.id" :demand="demand"></single-demand>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SingleDemand from './SingleDemand';

export default {
    name: "list-demands",

    components: {
        'single-demand': SingleDemand
    },

    data(){
        return {}
    },

    methods: {
        
    },

    computed: {
        ...mapGetters(['getAllDemands', 'getDemandsCount'])
    }
}
</script>




<style scoped>

</style>