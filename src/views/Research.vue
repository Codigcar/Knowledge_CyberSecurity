<template>
    <v-container>
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
            <h2>
              /{{kUName}}/{{this.$route.params.researchName}}
            </h2>
          </div>
          <div class="d-flex justify-end switch-big">
            <v-switch
              class="big-label"
              v-model="filterMode"
              :label="filterMode? 'By Knowledge Objectives': 'By keywords'"></v-switch>
          </div>
        </div>
        <div v-if="!filterMode">
          <v-text-field
            v-model="newKeyword"
            label="Keyword"
            append-icon="mdi-plus-circle-outline"
            single-line
            hide-details
            @click:append="addFilterItems(newKeyword)"
            class="search-text-field"
            >
          </v-text-field>
          <div class="d-flex justify-start mt-5">
            <v-card
            height="100%"
            v-for="kw in bestKeywords" :key="kw.name"
            dark
            @click="addFilterItems(kw.name)"
            class="mx-1 pa-1 red lighten-2">
              <span>{{kw.name}}</span>
            </v-card>
          </div>
        </div>
        <br>
        <div v-if="filterMode">
            <h3>Knowledge Objectives</h3>
            <br>
          </div>
        <v-card elevation="5" min-height="90px">
          <v-card-text v-if="filterItems.length === 0 && !filterMode">Aún no hay keywords añadidos</v-card-text>
          <v-container fluid>
            <v-row v-if="!filterMode">
              <v-col v-for="item in filterItems" :key="item">
                <v-card color="#42b883" dark>
                  <v-card-text  class="text-center" >
                    {{item}}
                    <v-btn icon>
                       <v-icon @click="removeFilterItems(item)">mdi-minus-circle-outline</v-icon>
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col v-for="item in koItems" :key="item.name">
                <v-tooltip bottom color="primary">
                  <template v-slot:activator="{on}">
                    <v-card
                    v-on="on"
                    :class="item.clicked? 'green accent-2':'grey accent-1'"
                    @click="checkKO(item)"
                    min-width="100%"
                    height="80px"
                    >
                      <v-card-text class="text-center" >
                        <b>{{item.name}}</b>
                      </v-card-text>
                    </v-card>
                  </template>
                  <span >Cant. Papers: {{item.paper_amount == null? 0 : item.paper_amount}}</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-container>                              
        </v-card>
        <div class="d-flex justify-end my-3">
          <v-btn depressed color="white" @click="expand = !expand">
            <span>Filtrado avanzado</span>
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </div>
        <div>
          <v-expand-transition>
            <v-card
            v-show="expand"
            width="50vw"
            class="mx-auto"
            >
              <v-list>
                <v-list-item v-for="adItem in advancedItems" :key="adItem">
                  <v-list-item-icon>
                    <v-icon>{{adItem.icon}}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content v-if="adItem.label != 'Año'">
                    <v-text-field :label="adItem.label" v-model="adItem.value"></v-text-field>
                  </v-list-item-content>
                  <v-list-item-content v-else>
                    <div class="d-flex justify-space-around">
                      <v-text-field label="Año Mínimo" v-model="adItem.value" ></v-text-field>
                      <v-icon class="mx-4">mdi-arrow-expand-horizontal</v-icon>
                      <v-text-field label="Año máximo" v-model="endYear" ></v-text-field>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-expand-transition>
        </div>
        <br>
        <div class="mx-auto text-center">
          <v-btn color="black accent-2" dark @click="onClickFilter">
            Filtrar
          </v-btn>
        </div>
        <br>
        <v-divider></v-divider>
        <br>
        <v-card>
          <v-card-title>
            Resultados filtrados
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="papers"
            :search="search"
            :loading="loadingData"
            loading-text="Cargando Papers..."
          >
            <template
              v-slot:body="{ items }"
              >
               <tbody>
                 <tr
                  v-for="item in items"
                  :key="item.title"
                 >
                  <td><span @click="goToLink(item)" class="text-hover">{{ item.title }}</span></td>
                  <td>{{ item.year }}</td>
                  <td>{{ item.doi }}</td>
                  <td>{{ item.authors }}</td>
                  <td>{{ item.documentType }}</td>
                  </tr>
               </tbody>
            </template>
          </v-data-table>
        </v-card>
        <br>
        <v-header v-if="!filterActive" class="d-flex justify-center">
          Aún no se han filtrado papers
        </v-header>
        
        
    </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        idKU: this.$route.params.idKU,
        sectorID: this.$route.params.sectorId,
        kUName: localStorage.getItem('KUName'),
        expand: false,
        filterMode: false,
        newKeyword: '',
        filterActive: false,
        filterItems: [],
        loadingData: false,
        bestKeywords:[],
        endYear: '',
        koItems: [
        ],
        advancedItems: [
          {label: 'Título', icon: 'mdi-subtitles-outline', value: ''},
          {label: 'Año', icon: 'mdi-calendar-range',value: ''},
          {label: 'DOI', icon: 'mdi-counter',value: ''},
          {label: 'Autor', icon: 'mdi-account',value: ''},
        ],
        search: '',
        checkedKO: {id : -1, name:''},
        headers: [
          {
            text: 'Paper Name',
            align: 'start',
            filterable: true,
            value: 'title',
          },
          { text: 'Año', value: 'year' },
          { text: 'DOI', value: 'doi' },
          { text: 'Autor', value: 'authors' },
          { text: 'Doc. Type', value: 'documentType' },
        ],
        papers: [
          
        ],
      }
    },
    methods:{
      addFilterItems(kw){
        if(kw !== ''){
          kw = kw.trim();
          this.filterItems.push(kw);
          this.newKeyword = '';  
        }
        else{
          alert('Por favor ingrese algún keyword');
        }
             
      },
      removeFilterItems(kw){
        let index = this.filterItems.indexOf(kw);
        this.filterItems.splice(index,1);        
      },
      onClickFilter(){
        if(this.filterMode && this.checkedKO.id == -1){
          alert('Escoja al menos 1 Knowledge Objective')
        }
        else{
          this.loadingData = true;
          const year1 = this.advancedItems[1].value;
          const year2 = this.endYear;
          const title = this.advancedItems[0].value;
          const doi = this.advancedItems[2].value;
          const autor = this.advancedItems[3].value;
          let kws = this.filterItems.join(';');
          let idKO = this.checkedKO.id;
          if (this.filterMode){kws ='';}
          else{
            idKO = '';
          }
          axios.get(`http://localhost:4899/knowledge-units/${this.idKU}/sectors/${this.sectorID}/papers?keywords=${kws}&startYear=${year1}&endYear=${year2}&title=${title}&doi=${doi}&author=${autor}&koId=${idKO}`)
          .then( (response) => {
            this.papers = response.data; 
            this.filterActive = true;
            this.loadingData = false;
        });
        }
        
      },
      getKOs(){
        axios.get(`http://localhost:4899/knowledge-units/${this.idKU}/sectors/${this.sectorID}/knowledge-objectives`)
        .then( (response) =>{
          let newkoItems = response.data;
          this.koItems = newkoItems.map(function(obj){
          let o =  Object.assign({},obj);
          o.clicked = false;
          return o;
          });          
        });
      },
      getBestKW(){
        axios.get(`http://localhost:4899/knowledge-units/${this.idKU}/sectors/${this.sectorID}/keywords`)
        .then( (response) =>{
          this.bestKeywords = response.data;  
        });
      },
      checkKO(item){
        if(this.koItems.every(ko => !ko.clicked)){
          item.clicked = true;
          this.checkedKO = item;
        }
        else{
          item.clicked = false;
          if(item.name == this.checkedKO.name){
            this.checkedKO = {id: -1, name: ''};
          }
        }
      },
      goToLink(item){
        window.open(item.link,'_blank');
      }
    },
    mounted(){
      this.getKOs();
      this.getBestKW();
    }
  }
</script>

<style scoped>
    .search-text-field{
      width: 250px;
    }
    .text-hover{
      text-decoration: underline;
    }
    .text-hover:hover{
      color:cornflowerblue;
      cursor: pointer;
    }
    .big-label >>> label{
      font-size: 20px;
    }
</style>
