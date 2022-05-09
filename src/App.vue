<template>
  <div id="app">
    <header class="text-center">
      <input v-model="Query" type="text">
      <button class="ms-3" @click="callApi">Go</button>
    </header>
    <main class="p-3">
      <ul v-for="movie in Movies" :key="movie.id">
        <li>Titolo: {{movie.title}}</li>
        <li>Titolo Originale: {{movie.original_title}}</li>
        <!-- <li>Lingua: {{movie.original_language}}</li> -->
        <li>Lingua: <LangFlag :iso="movie.original_language" /></li>
        <li>Voto: {{movie.vote_average}}</li>
      </ul>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import LangFlag from 'vue-lang-code-flags';

export default {
  name: 'App',
  components: {
    LangFlag,
  },
  data () {
    return {
      Api_Url: 'https://api.themoviedb.org/3/search/movie?api_key=716ab35d3b7d9aab1757e0bac9e90c1c&language=it-IT&query=<<QUERY>>&page=1&include_adult=false',
      Api_Key: '716ab35d3b7d9aab1757e0bac9e90c1c',
      Query: '',
      Movies: null,
    }
  },
  methods: {
    Api_Url_Generator(){
      return 'https://api.themoviedb.org/3/search/movie?api_key=' + this.Api_Key + '&language=it-IT&query=' + this.Query + '&page=1&include_adult=false';
    },
    callApi() {
      axios.get(this.Api_Url_Generator()).then((response) => {
                console.log(response);
                this.Movies = response.data.results;
            }).catch((error) => {
                console.log(error);
            })
    }
  },
  mounted() {
       // this.callApi();
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';
#app {
  background-color: black;
  color: white;
}
</style>
