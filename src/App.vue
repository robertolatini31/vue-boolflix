<template>
  <div id="app">
    <header class="text-center">
      <input v-model="Query" type="text">
      <button class="ms-3" @click="callApi">Go</button>
    </header>
    <main class="p-3">
      <h2>Lista Film:</h2>
                                                                <!-- <font-awesome-icon icon="fa-solid fa-star" />
                                                                <font-awesome-icon icon="fa-regular fa-star" /> -->
      <ul v-for="movie in Movies" :key="movie.id">
        <li>Titolo: {{movie.title}}</li>
        <li>Titolo Originale: {{movie.original_title}}</li>
        <!-- <li>Lingua: {{movie.original_language}}</li> -->
        <li>Lingua: <LangFlag :iso="movie.original_language" /></li>
        <li>
          Voto:
          <font-awesome-icon icon="fa-solid fa-star" v-for="item in (StarVotes(movie.vote_average))"  :key="item" />
          <font-awesome-icon icon="fa-regular fa-star" v-for="item in (5 - StarVotes(movie.vote_average))"  :key="item" />
        </li>
        <li>IMG: {{IMG_Url_Generator(movie.poster_path)}}</li>
      </ul>


      <h2>Lista Serie:</h2>
      <ul v-for="serie in Series" :key="serie.id">
        <li>Titolo: {{serie.name}}</li>
        <li>Titolo Originale: {{serie.original_name}}</li>
        <!-- <li>Lingua: {{serie.original_language}}</li> -->
        <li>Lingua: <LangFlag :iso="serie.original_language" /></li>
        <li>
          Voto:
          <font-awesome-icon icon="fa-solid fa-star" v-for="item in (StarVotes(serie.vote_average))"  :key="item" />
          <font-awesome-icon icon="fa-regular fa-star" v-for="item in (5 - StarVotes(serie.vote_average))"  :key="item" />
        </li>
        <li>IMG: {{IMG_Url_Generator(serie.poster_path)}}</li>
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
      serei_url: 'https://api.themoviedb.org/3/search/tv?api_key=<<api_key>>&language=it-IT&page=1&query=<<QUERY>>&include_adult=false',
      Api_Url: 'https://api.themoviedb.org/3/search/movie?api_key=716ab35d3b7d9aab1757e0bac9e90c1c&language=it-IT&query=<<QUERY>>&page=1&include_adult=false',
      Api_Key: '716ab35d3b7d9aab1757e0bac9e90c1c',
      Query: '',
      Movies: null,
      Series: null,
    }
  },
  methods: {
    StarVotes(number) {
      return Math.ceil(number / 2);
    },
    Api_Url_Generator(){
      return 'https://api.themoviedb.org/3/search/movie?api_key=' + this.Api_Key + '&language=it-IT&query=' + this.Query + '&page=1&include_adult=false';
    },
    IMG_Url_Generator(ApiImage){
      return 'https://image.tmdb.org/t/p/' + 'original' + ApiImage;
    },
    callApi() {
      let MoviesUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + this.Api_Key + '&language=it-IT&query=' + this.Query + '&page=1&include_adult=false';
      let SerieUrl = 'https://api.themoviedb.org/3/search/tv?api_key=' + this.Api_Key + '&language=it-IT&query=' + this.Query + '&page=1&include_adult=false';
      axios.get(MoviesUrl).then((response) => {
                console.log(response);
                this.Movies = response.data.results;
            }).catch((error) => {
                console.log(error);
            })
      axios.get(SerieUrl).then((response) => {
                console.log(response);
                this.Series = response.data.results;
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
