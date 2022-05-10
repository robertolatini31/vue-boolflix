<template>
  <div id="app">
    <header class="d-flex align-items-center justify-content-between p-3">
      <div class="right_header">
        <img src="@/assets/img/logo.png" alt="">
      </div>
      <!-- /.right_header -->
      <div class="left_header">
        <form class="d-flex" @submit.prevent>
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="Query" @keyup.enter="callApi">
          <button class="btn" type="submit"  @click="callApi">Search</button>
        </form>
      </div>
      <!-- /.left_header -->
    </header>


    <main class="p-3">
      <div class="container">
           <h2>Lista Film:</h2>
      
        <div class="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 justify-content-center">
          <div class="col py-3 px-2 d-flex justify-content-center align-items-center" v-for="movie in Movies" :key="movie.id">
            <div class="cards_container">
            <div class="card_container" :class="(movie.poster_path == null) ? 'bg_white' : ''">
              <img :src="IMG_Url_Generator(movie.poster_path)" @error="$event.target.src='https://www.theoxygenstore.com/images/source/No-image.jpg'" :alt="movie.title">
              <h5 v-if="movie.poster_path == null" class="m-0">{{movie.title}}</h5>
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
              <h5>Cast: <span v-for="actor in movie.Actors" :key="actor.id">
                          {{actor.name}}
                        </span>
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
      
      <!-- <ul v-for="movie in Movies" :key="movie.id">
        <li>Titolo: {{movie.title}}</li>
        <li>Titolo Originale: {{movie.original_title}}</li>
        <!- <li>Lingua: {{movie.original_language}}</li> -->
        <!-- <li>Lingua: <LangFlag :iso="movie.original_language" /></li>
        <li>
          Voto:
          <font-awesome-icon icon="fa-solid fa-star" v-for="item in (StarVotes(movie.vote_average))"  :key="item" />
          <font-awesome-icon icon="fa-regular fa-star" v-for="item in (5 - StarVotes(movie.vote_average))"  :key="item + 5" />
        </li>
        <li>IMG: {{IMG_Url_Generator(movie.poster_path)}}</li>
      </ul> -->


      <h2>Lista Serie:</h2>
       
        <div class="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 justify-content-center">
          <div class="col py-3 px-2 d-flex justify-content-center align-items-center" v-for="serie in Series" :key="serie.id">
            <div class="cards_container">
            <div class="card_container" :class="(serie.poster_path == null) ? 'bg_white' : ''">
              <img :src="IMG_Url_Generator(serie.poster_path)" @error="$event.target.src='https://www.theoxygenstore.com/images/source/No-image.jpg'" :alt="serie.name">
              <h5 v-if="serie.poster_path == null" class="m-0">{{serie.name}}</h5>
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
     
      <!-- <ul v-for="serie in Series" :key="serie.id">
        <li>Titolo: {{serie.name}}</li>
        <li>Titolo Originale: {{serie.original_name}}</li>
        <!- <li>Lingua: {{serie.original_language}}</li> -->
        <!-- <li>Lingua: <LangFlag :iso="serie.original_language" /></li>
        <li>
          Voto:
          <font-awesome-icon icon="fa-solid fa-star" v-for="item in (StarVotes(serie.vote_average))"  :key="item" />
          <font-awesome-icon icon="fa-regular fa-star" v-for="items in (5 - StarVotes(serie.vote_average))"  :key="items + 10" />
        </li>
        <li>IMG: {{IMG_Url_Generator(serie.poster_path)}}</li>
      </ul> --> 

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
      Movies: null,
      MovieArrayCast: null,
      Series: null,
      Genre: null,
      GenreSeries: null,
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
    CallCast(movie){
      return  axios.get('https://api.themoviedb.org/3/movie/' + movie.id + '/credits?api_key=716ab35d3b7d9aab1757e0bac9e90c1c&language=en-US').then((responseCast) => {
                      movie.Actors = responseCast.data.cast.slice(0, 5);
                  });
    },
    CallMovies(){
        let MoviesUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + this.Api_Key + '&language=it-IT&query=' + this.Query + '&page=1&include_adult=false';
      return  axios.get(MoviesUrl).then((response) => {
                //console.log(response);
                this.Movies = response.data.results;
                this.Movies.forEach(movie => {
                  Promise.all([this.CallCast(movie)])
                });
            }).catch((error) => {
                console.log(error);
            })
    },
    CallSeries() {
        let SerieUrl = 'https://api.themoviedb.org/3/search/tv?api_key=' + this.Api_Key + '&language=it-IT&query=' + this.Query + '&page=1&include_adult=false';
       return axios.get(SerieUrl).then((response) => {
               //console.log(response);
                this.Series = response.data.results;
            }).catch((error) => {
                console.log(error);
            })
    },
    CallGenre() {
        let GenreUrl = 'https://api.themoviedb.org/3/genre/list?api_key=716ab35d3b7d9aab1757e0bac9e90c1c&language=it-IT';      
       axios.get(GenreUrl).then((response) => {
                //console.log(response);
                this.Genre = response.data.genres;
            }).catch((error) => {
                console.log(error);
            })
    },
    callApi() {
         
         Promise.all([
           this.CallMovies(),
           this.CallSeries(),
         ])
      
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
  header {
    background-color: black;
    color: white;
    img {
      height: 50px;
    }
    form {
      button, input {
        // outline-color: transparent!important;
        border-color: #dc1a28!important;
      }
      button {
         color: #dc1a28;
      }
    }
  }
  main {
    background-color: #0d0d0d;
    box-shadow: 0px 9px 19px 0px white;
    color: white;
    height: 100vh;
    overflow-y: auto;

    .col {
      border-radius: 5px;
    }

    .cards_container {
      box-shadow: 0px 0px 8px white;
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
      h5 {
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
      }
    }
    .card_container:hover + .card_description, .card_description:hover {
      display: block;
    }
    .bg_white {
    background-color: white;
  }
  .color_star {
        color: goldenrod;
      }
  }
  
  

}

</style>



