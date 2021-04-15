<template>
  <div>
    <br>
    <div>
      <div class="d-inline-flex">
        <v-tooltip bottom>
          <template v-slot:activator="{on}">
              <v-btn icon
              @click="$router.go(-1)"
              v-on="on"
              color="blue accent-3">
                <v-icon>mdi-subdirectory-arrow-left</v-icon>
              </v-btn>
          </template>
          <span>Atrás</span>
        </v-tooltip>
      </div>
      <div class="d-inline-flex">
           <h2>/{{wrName}}</h2>
      </div>
    </div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="6" md="6" v-for="m in 2" :key="m">
          <v-list>
            <v-list-item v-for="unidad in unidadesLorR(m)" :key="unidad.title">
                <v-list-item-content>
                <v-card color="green lighten-4">
                   <v-toolbar color="indigo" dark>
                        <v-toolbar-title>{{unidad.title}}</v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon @click="unidad.arrow = !unidad.arrow">
                          <v-icon v-if="unidad.arrow">mdi-arrow-up</v-icon>
                          <v-icon v-else>mdi-arrow-down</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text v-if="unidad.arrow">
                    <v-list-item v-for="unit in unidad.items" :key="unit.id">
                      <v-list-item-content>
                        <v-card 
                        class="pa-3">
                         <p>
                          {{unit.description}}
                         </p>
                        </v-card>                      
                      </v-list-item-content>
                    </v-list-item>                      
                    </v-card-text>
                </v-card>
            </v-list-item-content>
            </v-list-item>                       
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  props: {},
  data() {
    return {
      wrId: this.$route.params.wrId,
      wrName: this.$route.params.wrName,
      ksats: [
      ],
      unidades: [
        {title:'Task',arrow: false,items:[]},
        {title:'Knowledge',arrow: false,items:[]},
        {title:'Skills',arrow: false,items:[]},
        {title:'Abilities',arrow: false,items:[]},
        ],
    };
  },
  methods:{
    unidadesLorR(m){
      if(m == 1){
        return [this.unidades[0],this.unidades[1]];
      }
      else{
        return [this.unidades[2],this.unidades[3]];
      }
    },
    getAllKsats(){
      axios.get(`http://localhost:4899/work-roles/${this.wrId}/ksat`)
      .then( (response) => {
        this.ksats = response.data;
        this.unidades[0].items = this.ksats.filter(ksat => ksat.type == "Task");
        this.unidades[1].items = this.ksats.filter(ksat => ksat.type == "Knowledge");
        this.unidades[2].items = this.ksats.filter(ksat => ksat.type == "Skills");
        this.unidades[3].items = this.ksats.filter(ksat => ksat.type == "Abilities");
        });
    },

  },
  mounted(){
      this.getAllKsats();
  }
};
</script>
