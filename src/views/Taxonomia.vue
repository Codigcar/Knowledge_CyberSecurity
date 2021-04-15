<template>
    <div>
        <v-img src="https://res.cloudinary.com/dggqauzyy/image/upload/v1618474607/e8txzt4wwdo9c9xqehxp.png">

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