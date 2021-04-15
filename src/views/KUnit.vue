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
           <h2>/{{KA}}/{{ KU }}</h2>
      </div>
    </div>
    
    <!--AQUÍ IRÍA LA DESCRIPCIÓN DEL KNOWLEDGE UNIT-->

    <v-container v-model="unidades">
      <v-row no-gutters>
         <!--..................Left Side.......................-->
        <v-col cols="12" sm="6" md="6">
          <v-list>
            <v-list-item>
            <v-list-item-content>
                <v-card color="green lighten-4">
                    <v-toolbar color="indigo" dark>
                        <v-toolbar-title>{{unidades[0].title}}</v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon @click="unidades[0].arrow = !unidades[0].arrow">
                          <v-icon v-if="unidades[0].arrow">mdi-arrow-up</v-icon>
                          <v-icon v-else>mdi-arrow-down</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text v-if="unidades[0].arrow">
                    <v-list-item v-for="unit in unidades[0].items" :key="unit.id">
                      <v-list-item-content>
                        <v-card 
                        class="pa-3">
                         <a 
                         style="text-decoration: none;"
                         :href="unit.link" target="_blank">
                          {{unit.name}}
                         </a>
                        </v-card>                      
                      </v-list-item-content>
                    </v-list-item>                      
                    </v-card-text>
                </v-card>
            </v-list-item-content>
            </v-list-item>
            <v-list-item>
            <v-list-item-content>
                <v-card color="green lighten-4">
                   <v-toolbar color="indigo" dark>
                        <v-toolbar-title>{{unidades[1].title}}</v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon @click="unidades[1].arrow = !unidades[1].arrow">
                          <v-icon v-if="unidades[1].arrow">mdi-arrow-up</v-icon>
                          <v-icon v-else>mdi-arrow-down</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text v-if="unidades[1].arrow">
                    <v-list-item v-for="unit in unidades[1].items" :key="unit.id">
                      <v-list-item-content>
                        <v-card 
                        class="pa-3">
                         <p>
                          {{unit.name}} [{{unit.date}}]
                         </p>
                        </v-card>                      
                      </v-list-item-content>
                    </v-list-item>                      
                    </v-card-text>
                </v-card>
            </v-list-item-content>
            </v-list-item>
            <v-list-item>
            <v-list-item-content>
                <v-card color="green lighten-4">
                    <v-toolbar color="indigo" dark>
                        <v-toolbar-title>{{unidades[2].title}}</v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon @click="unidades[2].arrow = !unidades[2].arrow">
                          <v-icon v-if="unidades[2].arrow">mdi-arrow-up</v-icon>
                          <v-icon v-else>mdi-arrow-down</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text v-if="unidades[2].arrow">
                    <v-list-item v-for="unit in unidades[2].items" :key="unit.id">
                      <v-list-item-content>
                        <v-card 
                        class="pa-3">
                         <a 
                         style="text-decoration: none;"
                         :href="unit.link" target="_blank">
                          {{unit.name}}
                         </a>
                        </v-card>                      
                      </v-list-item-content>
                    </v-list-item>                      
                    </v-card-text>
                </v-card>
            </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <!--....................Right Side.......................-->
        <v-col cols="12" sm="6" md="6">
          <v-list>
            <v-list-item>
                <v-list-item-content>
                <v-card color="green lighten-4">
                   <v-toolbar color="indigo" dark>
                        <v-toolbar-title>{{unidades[3].title}}</v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon @click="unidades[3].arrow = !unidades[3].arrow">
                          <v-icon v-if="unidades[3].arrow">mdi-arrow-up</v-icon>
                          <v-icon v-else>mdi-arrow-down</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text v-if="unidades[3].arrow">
                    <v-list-item v-for="unit in unidades[3].items" :key="unit.id">
                      <v-list-item-content>
                        <v-card 
                        class="pa-3">
                         <router-link 
                         style="text-decoration: none;"
                         :to="{name: 'Research', params: {idKA : KA, idKU: idKU, researchName: unit.name, sectorId: unit.id } }">
                          {{unit.name}}
                         </router-link>
                        </v-card>                      
                      </v-list-item-content>
                    </v-list-item>                      
                    </v-card-text>
                </v-card>
            </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                <v-card color="green lighten-4">
                   <v-toolbar color="indigo" dark>
                        <v-toolbar-title>{{unidades[4].title}}</v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon @click="unidades[4].arrow = !unidades[4].arrow">
                          <v-icon v-if="unidades[4].arrow">mdi-arrow-up</v-icon>
                          <v-icon v-else>mdi-arrow-down</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text v-if="unidades[4].arrow">
                    <v-list-item v-for="unit in unidades[4].items" :key="unit.id">
                      <v-list-item-content>
                        <v-card 
                        class="pa-3">
                         <router-link 
                         style="text-decoration: none;"
                         :to="{name: 'WorkRoles', params: {wrName: unit.name, wrId: unit.id}}">
                          {{unit.name}}
                         </router-link>
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
      KA: this.$route.params.idKA,
      KU: this.$route.params.KUName,
      idKU: this.$route.params.idKU,
      unidades: [
        {title:'Certifications',arrow: false,items:[]},
        {title:'Congreses',arrow: false,items:[]},
        {title:'Tools',arrow: false,items:[]},
        {title:'Research',arrow: false,items:[]},
        {title:'Work Roles',arrow: false,items:[]}
        ],
    };
  },
  methods:{
      certificatesByKU(){
        axios.get(`http://localhost:4899/knowledge-units/${this.idKU}/certificates`)
        .then( (response) => {this.unidades[0].items = response.data});
      },
      congresesByKU(){
        axios.get(`http://localhost:4899/knowledge-units/${this.idKU}/congresses`)
        .then( (response) => {this.unidades[1].items = response.data});
      },
      toolsByKU(){
        axios.get(`http://localhost:4899/knowledge-units/${this.idKU}/tools`)
        .then( (response) => {this.unidades[2].items = response.data});
      },
      sectorsByKU(){
        axios.get(`http://localhost:4899/knowledge-units/${this.idKU}/sectors`)
        .then( (response) => {this.unidades[3].items = response.data});
      },
      workRolesByKU(){
        axios.get(`http://localhost:4899/knowledge-units/${this.idKU}/work-roles`)
        .then( (response) => {this.unidades[4].items = response.data});
      }
  },
  mounted() {
    this.certificatesByKU();
    this.congresesByKU();
    this.toolsByKU();
    this.sectorsByKU();
    this.workRolesByKU();
    localStorage.setItem('KUName',this.KU);
  }
};
</script>
