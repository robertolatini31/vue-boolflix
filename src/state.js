import Vue from 'vue';

const state = Vue.observable({
    Query: '',
    GenreSelected: '',
    Movies: [],
    Series: [],
    PopularMovies: [],
    PopularSeries: [],
    Genres: [],
});


export default state;

