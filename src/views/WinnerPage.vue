<template>
  <v-container>
    <v-img class="background" :src="movie.movie_banner" />
    <v-container class="main">
      <h2 class="title">{{ $t('your-favorite-movie-is') }}</h2>
      <h1 class="title big">{{ movie.title }}</h1>
      <v-container class="descriptives">
        <v-card class="card" elevation="10" max-width="350">
          <v-img contain :src="movie.image" />
        </v-card>
        <v-container class="text">
          <h3><b>{{this.$t('description')}}</b>{{movie.description}}</h3><br>
          <h3><b>{{this.$t('release')}}</b>{{movie.release_date}}</h3><br>
          <h3><b>{{this.$t('duration')}}</b>{{movie.running_time}}min</h3><br>
          <h3><b>{{this.$t('rating')}}</b>{{movie.rt_score}}</h3>
        </v-container>
      </v-container>
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
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  z-index: 2;
  color: white;
}
.big {
  font-size: 40px !important;
}
.main {
  width: 100%;
  height: 100%;
  display: inline;
  align-content: center;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.card {
  display: flex;
  align-content: center;
  justify-items: center;
}
.background {
  top: 0;
  filter: blur(5px) brightness(70%);
  position: absolute;
  width: 100%;
  left: 0;
}
.descriptives {
  display: flex;
}
.descriptives > .text {
  text-align: left;
  color: white;
  text-shadow: 1px solid black;
}
.text {
  z-index: 1;
}
</style>
