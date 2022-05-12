<template>
  <main class="p-3">
      <div class="container mt-4">


      <div class="movies_if" v-if="!FilteredMovies.length > 0">
             <h2>Film Popolari:</h2>
      <div class="control_movies_true" v-if="FilteredPopularMovies.length > 0">
        <div class="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 ">
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
        <div class="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 ">
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


      


      <div class="series_if" v-if="!FilteredSeries.length > 0">
        <h2 class="pt_4">Serie Popolari:</h2>
        <div class="control_series_true" v-if="FilteredPopularSeries.length > 0">
        <div class="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 ">
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
        <div class="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 ">
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
</template>

<script>
import state from '@/state.js';
export default {
    name: 'SiteMain',
    props: {
      Movies: Array,
      Series: Array,
    },
    methods: {
      IMG_Url_Generator(ApiImage){
      return 'https://image.tmdb.org/t/p/' + 'original' + ApiImage;
      },
      StarVotes(number) {
      return Math.ceil(number / 2);
    },
    FilterGenre(MovieGenres){
        let NamesGenres = [];
        MovieGenres.forEach(MovieGenre => {
          state.Genres.forEach(Genre => {
            if (MovieGenre == Genre.id) {
              NamesGenres.push(Genre.name)
            }
          });
        });
        return NamesGenres;
    },
    },
    computed: {
    FilteredMovies(){
        if (state.Movies.length > 0 && state.GenreSelected != '') {
          return  state.Movies.filter(Movie => {
           return Movie.genre_ids.includes(state.GenreSelected);
           })
        } else return state.Movies;
    },
    FilteredSeries(){
        if (state.Series.length > 0 && state.GenreSelected != '') {
          return  state.Series.filter(Serie => {
           return Serie.genre_ids.includes(state.GenreSelected);
           })
        } else return state.Series;
    },
    FilteredPopularMovies(){
        if (state.PopularMovies.length > 0 && state.GenreSelected != '') {
          return  state.PopularMovies.filter(PopularMovie => {
           return PopularMovie.genre_ids.includes(state.GenreSelected);
           })
        } else return state.PopularMovies;
    },
    FilteredPopularSeries(){
        if (state.PopularSeries.length > 0 && state.GenreSelected != '') {
          return  state.PopularSeries.filter(PopularSerie => {
           return PopularSerie.genre_ids.includes(state.GenreSelected);
           })
        } else return state.PopularSeries;
    },
  },
}
</script>

<style lang="scss" scoped>
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
</style>