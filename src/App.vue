<template>
  <div id="app">
    <header class="text-center">
      <input v-model="Query" type="text">
      <button class="ms-3" @click="callApi">Go</button>
    </header>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  components: {
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
  height: 100vh;
}
</style>
