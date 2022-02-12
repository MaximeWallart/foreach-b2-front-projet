<template>
  <v-container>
        <v-img class="background left" :src="movie1.movie_banner" />
        <v-img class="background right" :src="movie2.movie_banner" />
        <h1 class="title">{{ $t('you-are-currently-in-the-round')}} {{round}}</h1>
    <v-row class="row">
      <v-col cols="6" class="col">
        <v-card
          elevation="20"
          max-width="350"
          @click="saveClickedMovie(movie1.id, movie2.id)"
        >
          <v-img contain :src="movie1.image" />
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="6" class="col">
        <v-card
          elevation="10"
          max-width="350"
          @click="saveClickedMovie(movie2.id, movie1.id)"
        >
          <v-img contain :src="movie2.image" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { getAllMovies, getMovie } from "../apis/movies";

export default {
  data() {
    return {
      movies: [],
      movie1: {},
      movie2: {},
      winners: [],
      losers: [],
      round: 1,
      error: "",
    };
  },
  methods: {
    async newRound() {
      this.movies = [];
      for (const winner of this.winners) {
        let tmp = await getMovie(winner);
        this.movies.push(tmp);
      }
      this.winners = [];
      this.losers = [];
      if (this.movies.length % 2 != 0) {
        this.winners.push(this.movies[0].id);
      }
      this.getRandomMovie();
      this.round++
    },
    async getWinner(){
      let win = await getMovie(this.winners[0])
      window.alert( this.$t('your-favorite-ghibli-movie-is') + win.title)
    },
    saveClickedMovie(winner, loser) {
      console.log("before : " + (this.winners.length + this.losers.length) + " / " + this.movies.length);
      if (this.winners.length + this.losers.length < this.movies.length) { 
        this.winners.push(winner);
        this.losers.push(loser);
        console.log("after : " + (this.winners.length + this.losers.length) + " / " + this.movies.length);
        // console.log(this.winners.length);
        // console.log(this.winners);
        // console.log(this.losers);
        if (this.winners.length + this.losers.length < this.movies.length) {
          this.getRandomMovie();
        }
      } else {
        if (this.winners.length == 1) {
          this.getWinner()
        } else {
          window.alert(this.$t('start-a-new-round'));
          this.newRound();
        }
      }
    },
    async setUp() {
      try {
        this.movies = await getAllMovies();
        if(this.movies.length%2!=0) {
          this.winners.push(this.movies[0].id);
        }
        this.getRandomMovie();
      } catch (e) {
        this.error = e;
      }
    },
    async getRandomMovie() {
      var idx1 = Math.floor(Math.random() * this.movies.length);
      while (
        this.winners.indexOf(this.movies[idx1].id) != -1 ||
        this.losers.indexOf(this.movies[idx1].id) != -1
      ) {
        idx1 = Math.floor(Math.random() * this.movies.length);
      }
      this.movie1 = this.movies[idx1];

      var idx2 = Math.floor(Math.random() * this.movies.length);
      // console.log(this.nmbr.indexOf(this.movies[idx2].id));
      while (
        idx2 == idx1 ||
        this.winners.indexOf(this.movies[idx2].id) != -1 ||
        this.losers.indexOf(this.movies[idx2].id) != -1
      ) {
        idx2 = Math.floor(Math.random() * this.movies.length);
      }
      this.movie2 = this.movies[idx2];
    },
  },
  async mounted() {
    return this.setUp();
  },
};
</script>
<style scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  color: white;
}
.left {
  left: 0;
}
.right {
  right: 0;
}
.background {
  top: 0;
  filter: blur(5px) brightness(70%);
  position: absolute;
  width: 51%;
  height: 100%;
}
.row {
  display: flex;
  align-items: center;
  justify-content: center;
}
.col {
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  padding: 0;
  margin: 40px 0px 0px 0px;
}
</style>
