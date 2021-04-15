<template> 
    <div class="bgimg">
        <br>
        <br>
        <br>
        <div class="ml-6">
            <h1>TAXONOMÍA DE CIBERSEGURIDAD</h1>
            <h1>BASADA EN ACM</h1>
            <div class="mt-2 subhdr ml-6">
                <p>
                <i>Una taxonomía basada en las áreas de conocimientos</i>
                </p>
                <p>
                <i>del ACM para cubrir 
                líneas de investigación.</i>
                </p>
            </div>
        </div>
        <div>
            <v-container class="pl-2">
                <h3>La taxonomía se compone de lo siguiente:</h3>
                <br>
                <ul>
                    <li>Knowledge Area (KA) y New Trends</li>
                    <li>Knowledge Units (KU)</li>
                    <li>Congresses</li>
                    <li>Certifications</li>
                    <li>Research by sector (Keyword and Knowledge Objetive)</li>
                    <li>Work Roles (Knowledge, Skills and Abilities)</li>
                </ul>
                <br>
                <br>
                <div>
                <h3>
                    Te presentamos la guía de taxonomía
                    <router-link to="/taxonomyChart">Aquí</router-link>
                </h3>
                </div>
            </v-container>
            <div class="relleno"></div>
        </div>
        <div class="text-center mt-7">
                <v-btn
                    elevation="5"
                    :color="active ? 'primary' : 'secondary'"
                    :dark="active"
                    class="mx-auto"
                    rounded="xl"
                    @click="onCLickGetIn"
                    >{{ active ? 'Ingresando . . .' : 'Ingresar' }}</v-btn>
        </div>
    </div>

 
</template>

<script>
export default {
    name: "Home",
    data:()=>({
        active: false,
    }),
    methods:{
        onCLickGetIn(){
            this.active = true;
            setTimeout(()=>{this.$router.push('/karea');},800);
        }    
    }
}
</script>



<style scoped>
    .bgimg {
        background-image: url('../assets/cyber security lock.jpg');
        color: white;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .relleno{
        height: 150px;
    }
    .subhdr{
        font-size: 20px;
        font-weight: 300;
        color: #42ff83;
    }
</style>


