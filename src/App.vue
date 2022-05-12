<template>
  <div id="app">
    <header class="d-flex align-items-center justify-content-between p-3">
      <div class="right_header">
        <img src="@/assets/img/logo.png" alt="">
      </div>
      <!-- /.right_header -->
      <div class="left_header">
        <form class="d-flex" @submit.prevent>
          <input class="form-control me-2" type="search" placeholder="Cerca" aria-label="Search" v-model="Query" @keyup.enter="CallApi">
          <select class="form-select me-2" v-model="GenreSelected">
            <option value="" disabled selected>Scegli Genere</option>
            <option value="">Tutti</option>
            <option v-for="genre in Genres" :key="genre.id" :value="genre.id">{{genre.name}}</option>
          </select>
          <button class="btn " type="submit"  @click="CallApi"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
        </form>
      </div>
      <!-- /.left_header -->
    </header>


    <main class="p-3">
      <div class="container mt-4">


      <div class="movies_if" v-if="!Movies.length > 0">
             <h2>Film Popolari:</h2>
      <div class="control_movies_true" v-if="FilteredPopularMovies.length > 0">
        <div class="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 justify-content-center">
          <div class="col py-3 px-2 d-flex justify-content-center align-items-center" v-for="movie in FilteredPopularMovies" :key="movie.id">
            <div class="cards_container">
            <div class="card_container" :class="(movie.poster_path == null) ? 'bg_white' : ''">
              <img :src="IMG_Url_Generator(movie.poster_path)" @error="$event.target.src='https://www.theoxygenstore.com/images/source/No-image.jpg'" :alt="movie.title">
              <h5 class="safe_title m-0" v-if="movie.poster_path == null">{{movie.title}}</h5>
            </div>
            <!-- /.card_container -->
            <div class="card_description p-2" :style="[(movie.backdrop_path != null ? {'background': 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),' + 'url(' + IMG_Url_Generator(movie.backdrop_path) + ') center no-repeat'} : {'background': 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5))'})]">
              <div class="text_description">
                <h5>Titolo: <span>{{movie.title}}</span></h5>
              <h5>Titolo Originale: <span>{{movie.original_title}}</span></h5>
              <h5>Lingua: <span>
                            <LangFlag :iso="movie.original_language" />
                          </span>
              </h5>
              <h5>Voto: <span>
                          <font-awesome-icon icon="fa-solid fa-star" v-for="item in (StarVotes(movie.vote_average))"  :key="item" class="color_star" />
                          <font-awesome-icon icon="fa-regular fa-star" v-for="item in (5 - StarVotes(movie.vote_average))"  :key="item + 5" class="color_star" />
                        </span>
              </h5>
              <h5>Cast: <span v-for="(actor, index) in movie.Actors" :key="actor.id + 'ciao' + index">
                          {{actor.name}} <br>
                        </span>
                       
              </h5>
              <h5>Generi: <span v-for="(GenreName, index) in FilterGenre(movie.genre_ids)" :key="GenreName + index">
                            {{GenreName}} <br>
                          </span>
                          <span v-if="FilterGenre(movie.genre_ids).length == 0">Nessuna Informazione</span>
              </h5>
              <h5>Overview: 
                <span v-if="movie.overview.length != 0">{{movie.overview}}</span>
                <span v-else>Nessuna Descrizione Disponibile</span>
              </h5>
              </div>
              <!-- /.text_description -->
            </div>
            <!-- /.card_description -->
          </div>
      <!-- /.cards_container -->
          </div>
          <!-- /.col -->

          

        </div>
        <!-- /.row row-cols-5 -->
      </div>
      <!-- /.control_Movies -->

      <div class="control_movies_false text-center text-white p-4" v-else>
        <h2>Nessun Film Trovato</h2>
        <p>cambiare filtri</p>
      </div>
      <!-- /.control_movies_false -->

      </div>
      <!-- /.movies_if ------------------------------------------------------------>


      <div class="movies_if" v-else>
             <h2>Film:</h2>
      <div class="control_movies_true" v-if="FilteredMovies.length > 0">
        <div class="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 justify-content-center">
          <div class="col py-3 px-2 d-flex justify-content-center align-items-center" v-for="movie in FilteredMovies" :key="movie.id">
            <div class="cards_container">
            <div class="card_container" :class="(movie.poster_path == null) ? 'bg_white' : ''">
              <img :src="IMG_Url_Generator(movie.poster_path)" @error="$event.target.src='https://www.theoxygenstore.com/images/source/No-image.jpg'" :alt="movie.title">
              <h5 class="safe_title m-0" v-if="movie.poster_path == null">{{movie.title}}</h5>
            </div>
            <!-- /.card_container -->
            <div class="card_description p-2" :style="[(movie.backdrop_path != null ? {'background': 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),' + 'url(' + IMG_Url_Generator(movie.backdrop_path) + ') center no-repeat'} : {'background': 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5))'})]">
              <div class="text_description">
                <h5>Titolo: <span>{{movie.title}}</span></h5>
              <h5>Titolo Originale: <span>{{movie.original_title}}</span></h5>
              <h5>Lingua: <span>
                            <LangFlag :iso="movie.original_language" />
                          </span>
              </h5>
              <h5>Voto: <span>
                          <font-awesome-icon icon="fa-solid fa-star" v-for="item in (StarVotes(movie.vote_average))"  :key="item" class="color_star" />
                          <font-awesome-icon icon="fa-regular fa-star" v-for="item in (5 - StarVotes(movie.vote_average))"  :key="item + 5" class="color_star" />
                        </span>
              </h5>
              <h5>Cast: <span v-for="(actor, index) in movie.Actors" :key="actor.id + 'ciao' + index">
                          {{actor.name}} <br>
                        </span>
                       
              </h5>
              <h5>Generi: <span v-for="(GenreName, index) in FilterGenre(movie.genre_ids)" :key="GenreName + index">
                            {{GenreName}} <br>
                          </span>
                          <span v-if="FilterGenre(movie.genre_ids).length == 0">Nessuna Informazione</span>
              </h5>
              <h5>Overview: 
                <span v-if="movie.overview.length != 0">{{movie.overview}}</span>
                <span v-else>Nessuna Descrizione Disponibile</span>
              </h5>
              </div>
              <!-- /.text_description -->
            </div>
            <!-- /.card_description -->
          </div>
      <!-- /.cards_container -->
          </div>
          <!-- /.col -->

          

        </div>
        <!-- /.row row-cols-5 -->
      </div>
      <!-- /.control_Movies -->

      <div class="control_movies_false text-center text-white p-4" v-else>
        <h2>Nessun Film Trovato</h2>
        <p>cambiare filtri</p>
      </div>
      <!-- /.control_movies_false -->

      </div>
      <!-- /.movies_if -->


      


      <div class="series_if" v-if="!Series.length > 0">
        <h2 class="pt_4">Serie Popolari:</h2>
        <div class="control_series_true" v-if="FilteredPopularSeries.length > 0">
        <div class="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 justify-content-center">
          <div class="col py-3 px-2 d-flex justify-content-center align-items-center" v-for="serie in FilteredPopularSeries" :key="serie.id">
            <div class="cards_container">
            <div class="card_container" :class="(serie.poster_path == null) ? 'bg_white' : ''">
              <img :src="IMG_Url_Generator(serie.poster_path)" @error="$event.target.src='https://www.theoxygenstore.com/images/source/No-image.jpg'" :alt="serie.name">
              <h5 v-if="serie.poster_path == null" class="safe_title m-0">{{serie.name}}</h5>
            </div>
            <!-- /.card_container -->
            <div class="card_description p-2" :style="[(serie.backdrop_path != null ? {'background': 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),' + 'url(' + IMG_Url_Generator(serie.backdrop_path) + ') center no-repeat'} : {'background': 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5))'})]">
              <div class="text_description">
                <h5>Titolo: <span>{{serie.name}}</span></h5>
              <h5>Titolo Originale: <span>{{serie.original_name}}</span></h5>
              <h5>Lingua: <span>
                            <LangFlag :iso="serie.original_language" />
                          </span>
              </h5>
              <h5>Voto: <span>
                          <font-awesome-icon icon="fa-solid fa-star" v-for="item in (StarVotes(serie.vote_average))"  :key="item" class="color_star" />
                          <font-awesome-icon icon="fa-regular fa-star" v-for="item in (5 - StarVotes(serie.vote_average))"  :key="item + 10" class="color_star" />
                        </span>
              </h5>
              <h5>Cast: <span v-for="(actor, index) in serie.Actors" :key="actor.id + 'unique' + index">
                          {{actor.name}} <br>
                        </span>
                        <!-- <span v-if="serie.Actors.length == 0">Nessuna Informazione</span> -->
              </h5>
              <h5>Generi: <span v-for="(GenreName, index) in FilterGenre(serie.genre_ids)" :key="index + GenreName">
                            {{GenreName}} <br>
                          </span>
                          <span v-if="FilterGenre(serie.genre_ids).length == 0">Nessuna Informazione</span>
              </h5>
              <h5>Overview: 
                <span v-if="serie.overview.length != 0">{{serie.overview}}</span>
                <span v-else>Nessuna Descrizione Disponibile</span>
              </h5>
              </div>
              <!-- /.text_description -->
            </div>
            <!-- /.card_description -->
           </div>
           <!-- /. cards_container  -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row row-cols-5 -->
        </div>
        <!-- /.control_series_true -->
        <div class="control_series_false text-center text-white p-4" v-else>
            <h2>Nessuna Serie Trovata</h2>
            <p>cambiare filtri</p>
        </div>
        <!-- /.control_series_false -->
      </div>
      <!-- /.series_if ---------------------------------------------------->
      
      <div class="series_if" v-else>
        <h2 class="pt_4">Serie:</h2>
        <div class="control_series_true" v-if="FilteredSeries.length > 0">
        <div class="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 justify-content-center">
          <div class="col py-3 px-2 d-flex justify-content-center align-items-center" v-for="serie in FilteredSeries" :key="serie.id">
            <div class="cards_container">
            <div class="card_container" :class="(serie.poster_path == null) ? 'bg_white' : ''">
              <img :src="IMG_Url_Generator(serie.poster_path)" @error="$event.target.src='https://www.theoxygenstore.com/images/source/No-image.jpg'" :alt="serie.name">
              <h5 v-if="serie.poster_path == null" class="safe_title m-0">{{serie.name}}</h5>
            </div>
            <!-- /.card_container -->
            <div class="card_description p-2" :style="[(serie.backdrop_path != null ? {'background': 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),' + 'url(' + IMG_Url_Generator(serie.backdrop_path) + ') center no-repeat'} : {'background': 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5))'})]">
              <div class="text_description">
                <h5>Titolo: <span>{{serie.name}}</span></h5>
              <h5>Titolo Originale: <span>{{serie.original_name}}</span></h5>
              <h5>Lingua: <span>
                            <LangFlag :iso="serie.original_language" />
                          </span>
              </h5>
              <h5>Voto: <span>
                          <font-awesome-icon icon="fa-solid fa-star" v-for="item in (StarVotes(serie.vote_average))"  :key="item" class="color_star" />
                          <font-awesome-icon icon="fa-regular fa-star" v-for="item in (5 - StarVotes(serie.vote_average))"  :key="item + 10" class="color_star" />
                        </span>
              </h5>
              <h5>Cast: <span v-for="(actor, index) in serie.Actors" :key="actor.id + 'unique' + index">
                          {{actor.name}} <br>
                        </span>
                        <!-- <span v-if="serie.Actors.length == 0">Nessuna Informazione</span> -->
              </h5>
              <h5>Generi: <span v-for="(GenreName, index) in FilterGenre(serie.genre_ids)" :key="index + GenreName">
                            {{GenreName}} <br>
                          </span>
                          <span v-if="FilterGenre(serie.genre_ids).length == 0">Nessuna Informazione</span>
              </h5>
              <h5>Overview: 
                <span v-if="serie.overview.length != 0">{{serie.overview}}</span>
                <span v-else>Nessuna Descrizione Disponibile</span>
              </h5>
              </div>
              <!-- /.text_description -->
            </div>
            <!-- /.card_description -->
           </div>
           <!-- /. cards_container  -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row row-cols-5 -->
        </div>
        <!-- /.control_series_true -->
        <div class="control_series_false text-center text-white p-4" v-else>
            <h2>Nessuna Serie Trovata</h2>
            <p>cambiare filtri</p>
        </div>
        <!-- /.control_series_false -->
      </div>
      <!-- /.series_if -->
     
      

      </div>
      <!-- /.container -->
    </main>
  </div>
</template>

<script>
import axios from 'axios';
// import LangFlag from 'vue-lang-code-flags';

export default {
  name: 'App',
  components: {
    // LangFlag,
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
    StarVotes(number) {
      return Math.ceil(number / 2);
    },
    Api_Url_Generator(){
      return 'https://api.themoviedb.org/3/search/movie?api_key=' + this.Api_Key + '&language=it-IT&query=' + this.Query + '&page=1&include_adult=false';
    },
    IMG_Url_Generator(ApiImage){
      return 'https://image.tmdb.org/t/p/' + 'original' + ApiImage;
    },
    CallGenre() {
        let GenreUrl = 'https://api.themoviedb.org/3/genre/list?api_key=' + this.Api_Key + '&language=it-IT';      
       axios.get(GenreUrl).then((response) => {
                //console.log(response);
                this.Genres = response.data.genres;
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
                      PopularMovie.Actors = responseCast.data.cast.slice(0, 5);
                      this.$forceUpdate()
                  });

              });
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
                      PopularSerie.Actors = responseCast.data.cast.slice(0, 5);
                      this.$forceUpdate()
                  });

              });
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
                      movie.Actors = responseCast.data.cast.slice(0, 5);
                      this.$forceUpdate()
                  });

              });
            }).catch((error) => {
                console.log(error);
            });
            
            let SerieUrl = 'https://api.themoviedb.org/3/search/tv?api_key=' + this.Api_Key + '&language=it-IT&query=' + this.Query + '&page=1&include_adult=false';
        axios.get(SerieUrl).then((response) => {
               //console.log(response);
                this.Series = response.data.results;
                this.Series.forEach(serie => {
              axios.get('https://api.themoviedb.org/3/tv/' + serie.id + '/credits?api_key=716ab35d3b7d9aab1757e0bac9e90c1c&language=en-US').then((responseCast) => {
                      serie.Actors = responseCast.data.cast.slice(0, 5);
                      this.$forceUpdate()
                  });

              });
            }).catch((error) => {
                console.log(error);
            })
         
          } else {
            this.Query = '';
          }
    },
    FilterGenre(MovieGenres){
        let NamesGenres = [];
        MovieGenres.forEach(MovieGenre => {
          this.Genres.forEach(Genre => {
            if (MovieGenre == Genre.id) {
              NamesGenres.push(Genre.name)
            }
          });
        });
        return NamesGenres;
    },
  },
  mounted() {
      this.CallGenre();
      this.CallPopularMovies();
      this.CallPopularSeries();
  },
  computed: {
    FilteredMovies(){
        if (this.Movies.length > 0 && this.GenreSelected != '') {
          return  this.Movies.filter(Movie => {
           return Movie.genre_ids.includes(this.GenreSelected);
           })
        } else return this.Movies;
    },
    FilteredSeries(){
        if (this.Series.length > 0 && this.GenreSelected != '') {
          return  this.Series.filter(Serie => {
           return Serie.genre_ids.includes(this.GenreSelected);
           })
        } else return this.Series;
    },
    FilteredPopularMovies(){
        if (this.PopularMovies.length > 0 && this.GenreSelected != '') {
          return  this.PopularMovies.filter(PopularMovie => {
           return PopularMovie.genre_ids.includes(this.GenreSelected);
           })
        } else return this.PopularMovies;
    },
    FilteredPopularSeries(){
        if (this.PopularSeries.length > 0 && this.GenreSelected != '') {
          return  this.PopularSeries.filter(PopularSerie => {
           return PopularSerie.genre_ids.includes(this.GenreSelected);
           })
        } else return this.PopularSeries;
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';
#app {
  .pt_4 {
    padding-top: 4rem!important;
  }
  header {
    box-shadow: 0px -16px 20px 0px white;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    background-color: rgb(0 0 0 / 96%);
    color: white;
    img {
      height: 50px;
    }
    form {
      button, input, select {
        // outline-color: transparent!important;
        border-color: #dc1a28!important;
      }
      button {
         color: #dc1a28;
      }
    }
  }
  main {
    padding-top: 100px!important;
    // background-color: #0d0d0d;
    background-image: url('@/assets/img/bg_dark.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    color: white;
    height: 100vh;
    overflow-y: auto;

    .col {
      border-radius: 5px;
    }

    .cards_container {
      box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.95);
      position: relative;
      height: 350px;
      width: 240px;
      border-radius: 5px;
    }
    .card_container {
      height: 100%;
      width: 100%;
      position: relative;
      border-radius: 5px;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 5px;
      }
      .safe_title {
        color: black;
        position: absolute;
        bottom: 5px;
        left: 5px;
      }
    }
    .card_description {
      z-index: 5;
      background-size: cover!important;
      color: white;
      height: 100%;
      width: 100%;
      overflow-y: auto;
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      border-radius: 4px;
      .text_description {
        filter: drop-shadow(2px 4px 6px black);
        span {
          font-size: 1rem;
          font-weight: 400;
        }
      }
    }
    .card_container:hover + .card_description, .card_description:hover {
      display: block;
    }
    .bg_white {
    background-color: white;
  }
  .color_star {
        color: #dc1a28;
      }
  }
  
  

}

</style>



