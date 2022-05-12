<template>
  <header class="d-flex align-items-center justify-content-between p-3">
      <div class="right_header">
        <img src="@/assets/img/logo.png" alt="">
      </div>
      <!-- /.right_header -->
      <div class="left_header">
        <form class="d-flex" @submit.prevent>
          <input class="form-control me-2" type="search" placeholder="Cerca" aria-label="Search" :value="Query"
      v-on:input="$emit('input', $event.target.value)" @keyup.enter="$emit('QueryInput')">
          <select class="form-select me-2" v-model="GenreSelected" @change="GenreSelectedToState">
            <option value="" disabled selected>Scegli Genere</option>
            <option value="">Tutti</option>
            <option v-for="genre in Genres" :key="genre.id" :value="genre.id">{{genre.name}}</option>
          </select>
          <button class="btn " type="submit" @click="$emit('QueryInput')"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
        </form>
      </div>
      <!-- /.left_header -->
    </header>
</template>

<script>
import state from '@/state.js';
export default {
    name: 'SiteHeader',
    props: {
        Genres: Array,
    },
    data () {
        return {
            Query: '',
            GenreSelected: '',
        }
    },
    methods: {
        GenreSelectedToState() {
            state.GenreSelected = this.GenreSelected;
        }
    }
}
</script>

<style lang="scss" scoped>
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
</style>