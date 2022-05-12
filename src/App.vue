<template>
  <div id="app">
    
    <Header :Genres="Genres" v-model="Query" @QueryInput="CallApi"/>

    <Main :Movies="Movies" :Seires="Series"/>

  </div>
</template>

<script>
import axios from 'axios';
import state from '@/state.js';
import Header from '@/components/SiteHeader.vue'
import Main from '@/components/SiteMain.vue'
// import LangFlag from 'vue-lang-code-flags';

export default {
  name: 'App',
  components: {
    Header,
    Main,
  },
  data () {
    return {
      serei_url: 'https://api.themoviedb.org/3/search/tv?api_key=<<api_key>>&language=it-IT&page=1&query=<<QUERY>>&include_adult=false',
      Api_Url: 'https://api.themoviedb.org/3/search/movie?api_key=716ab35d3b7d9aab1757e0bac9e90c1c&language=it-IT&query=<<QUERY>>&page=1&include_adult=false',
      Api_Key: '716ab35d3b7d9aab1757e0bac9e90c1c',
      Query: '',
      Movies: [],
      Series: [],
      Genres: [],
      PopularMovies: [],
      PopularSeries: [],
      GenreSelected: '',
    }
  },
  methods: {
    
    Api_Url_Generator(){
      return 'https://api.themoviedb.org/3/search/movie?api_key=' + this.Api_Key + '&language=it-IT&query=' + this.Query + '&page=1&include_adult=false';
    },
    
    CallGenre() {
        let GenreUrl = 'https://api.themoviedb.org/3/genre/list?api_key=' + this.Api_Key + '&language=it-IT';      
       axios.get(GenreUrl).then((response) => {
                //console.log(response);
                this.Genres = response.data.genres;
                state.Genres = this.Genres;
            }).catch((error) => {
                console.log(error);
            })
    },
    CallPopularMovies(){
      let PopularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=' + this.Api_Key + '&language=it-IT&page=1';  
      axios.get(PopularMoviesUrl).then((response) => {
                //console.log(response);
                this.PopularMovies = response.data.results;
                this.PopularMovies.forEach(PopularMovie => {
              axios.get('https://api.themoviedb.org/3/movie/' + PopularMovie.id + '/credits?api_key=716ab35d3b7d9aab1757e0bac9e90c1c&language=en-US').then((responseCast) => {
                      this.$set(PopularMovie, 'Actors', responseCast.data.cast.slice(0, 5))
                  });

              });
              state.PopularMovies = this.PopularMovies;
            }).catch((error) => {
                console.log(error);
            })
    },
    CallPopularSeries(){
      let PopularSeriesUrl = 'https://api.themoviedb.org/3/tv/popular?api_key=' + this.Api_Key + '&language=it-IT&page=1';  
      axios.get(PopularSeriesUrl).then((response) => {
                //console.log(response);
                this.PopularSeries = response.data.results;
                this.PopularSeries.forEach(PopularSerie => {
              axios.get('https://api.themoviedb.org/3/tv/' + PopularSerie.id + '/credits?api_key=716ab35d3b7d9aab1757e0bac9e90c1c&language=en-US').then((responseCast) => {
                      this.$set(PopularSerie, 'Actors', responseCast.data.cast.slice(0, 5))
                  });

              });
              state.PopularSeries = this.PopularSeries;
            }).catch((error) => {
                console.log(error);
            })
    },
    CallApi() {
          if (this.Query.length > 0 && this.Query.replace(/\s/g, '').length > 0) {
            let MoviesUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + this.Api_Key + '&language=it-IT&query=' + this.Query + '&page=1&include_adult=false';
          axios.get(MoviesUrl).then((response) => {
                //console.log(response);
                this.Movies = response.data.results;
                this.Movies.forEach(movie => {
              axios.get('https://api.themoviedb.org/3/movie/' + movie.id + '/credits?api_key=716ab35d3b7d9aab1757e0bac9e90c1c&language=en-US').then((responseCast) => {
                      // movie.Actors = responseCast.data.cast.slice(0, 5);
                      // this.$forceUpdate()
                      this.$set(movie, 'Actors', responseCast.data.cast.slice(0, 5))
                  });

              });
              state.Movies = this.Movies;
            }).catch((error) => {
                console.log(error);
            });
            
            let SerieUrl = 'https://api.themoviedb.org/3/search/tv?api_key=' + this.Api_Key + '&language=it-IT&query=' + this.Query + '&page=1&include_adult=false';
        axios.get(SerieUrl).then((response) => {
               //console.log(response);
                this.Series = response.data.results;
                this.Series.forEach(serie => {
              axios.get('https://api.themoviedb.org/3/tv/' + serie.id + '/credits?api_key=716ab35d3b7d9aab1757e0bac9e90c1c&language=en-US').then((responseCast) => {
                      this.$set(serie, 'Actors', responseCast.data.cast.slice(0, 5))
                  });

              });
              state.Series = this.Series;
            }).catch((error) => {
                console.log(error);
            })
         
          } else {
            this.Query = '';
          }
    },
    
  },
  mounted() {
      this.CallGenre();
      this.CallPopularMovies();
      this.CallPopularSeries();
  },
  
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';
#app {
  .pt_4 {
    padding-top: 4rem!important;
  }
}
</style>



