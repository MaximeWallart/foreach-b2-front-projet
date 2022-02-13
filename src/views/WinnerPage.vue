<template>
  <v-container>
    <!-- <v-img class="background" :src="movie.movie_banner" /> -->
    <v-container class="main">
      <h2 class="text">Votre film préféré est</h2>
      <h1 class="text">{{ movie.title }}</h1>
      <v-card elevation="10" max-width="350">
        <v-img contain :src="movie.image" />
      </v-card>
    </v-container>
  </v-container>
</template>
<script>
import { getMovie } from "../apis/movies.js";
export default {
  data() {
    return {
      movie: {},
      error: "",
    };
  },
  methods: {
    async getCurrentMovie() {
      try {
        this.movie = await getMovie(this.$route.params.id);
      } catch (e) {
        this.error = e;
        throw new Error(this.error);
      }
    },
  },
  async mounted() {
    this.getCurrentMovie();
  },
};
</script>
<style scoped>
.main {
  display: flex;
  align-content: center;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.background {
  width: 100%;
  left: 0;
}
.text {
  z-index: 1;
}
</style>
