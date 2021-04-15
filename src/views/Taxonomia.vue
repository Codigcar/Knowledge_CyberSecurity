<template>
    <div>
        <v-img src="../assets/TaxonomyChart.png">

        </v-img>
        <br>
        <div 
            class="text-center">
            <v-btn
                color="secondary"
                elevation="5"
                x-large
                @click="onClickGoBack">
                Volver
            </v-btn>
        </div>
    </div>    
</template>

<script>
export default {
    methods:{
        onClickGoBack(){
            this.$router.push('/');
        }
    }
}
</script>