<template>
  <div align="center">
    <br>
    <h1>Áreas de Conocimientos y New Trends</h1>
    <br />
    <div>
      <v-list>
        <v-list-item v-for="item in areas" :key="item.id">
          <v-list-item-content>
              <v-card
                class="mx-auto"
                max-width="60vw"
                color="green lighten-4"
                >
                  <v-toolbar
                  color="indigo"
                  dark>
                    <v-toolbar-title>
                      <v-icon>mdi-shield-lock</v-icon>
                      {{item.name}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon v-on:click="onClickArrow(item)">
                      <v-icon v-if="item.arrowed">mdi-arrow-up</v-icon>
                      <v-icon v-else>mdi-arrow-down</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text v-if="item.arrowed">
                    <p>{{item.definition}}</p>
                    <hr>
                    <br>
                    <v-header class="title-bold">Unidades de Conocimiento</v-header>
                    <v-list-item v-for="ku in kunitsByKA(item.id)" :key="ku.id">
                      <v-list-item-content>
                        <v-card 
                        class="mx-auto"
                        @click="onClickKunit(item,ku)"
                        >
                        <v-card-text>
                          {{ku.name}}
                        </v-card-text>
                        </v-card>
                      </v-list-item-content>
                    </v-list-item>                      
                  </v-card-text>
              </v-card>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "KArea",
  data() {
    return {
      areas: [
      ],
      kunits:[

      ]
    };
  },
  methods:{
      getKAreas(){
          axios.get('https://knowledge-demo.herokuapp.com/knowledge-areas')
          .then( (response) => {
            let initialAreas = response.data;
            this.areas = initialAreas.map(function(obj){
            let o =  Object.assign({},obj);
            o.arrowed = false;
            return o;
          });
          });              
      },
      getKUnits(){
        axios.get('http://localhost:4899/knowledge-units')
        .then((response) =>{
          this.kunits = response.data;
        });
      },
      onClickArrow(item){
        item.arrowed = !item.arrowed;
      },
      onClickKunit(item,ku){
         this.$router.push({
           name: "KUnit",params:{idKA: item.name, KUName: ku.name, idKU: ku.id}
           });
      },
      kunitsByKA(id){
         return this.kunits.filter(kunit => kunit.knowledgeArea == id);
      }
  },
  mounted(){
      this.getKAreas();
      this.getKUnits();
  }

};
</script>

<style scoped>
.title-bold{
    font-weight: 300;
    font-size: 22px;
}
</style>