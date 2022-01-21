<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-card elevation="10" max-width="500" @click="saveClickedMovie(movie1.id, movie2.id)">
          <v-img contain :src="movie1.image"/>
        </v-card>
      </v-col>
      <v-col cols="4" class="versus">VS</v-col>
      <v-col cols="4">
        <v-card elevation="10" max-width="500" @click="saveClickedMovie(movie2.id, movie1.id)">
          <v-img contain :src="movie2.image" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { getAllMovies } from "../apis/movies";

export default {
  data() {
    return {
      movies: {},
      movie1: {},
      movie2: {},
      winners: [],
      losers: [],
      error: "",
    };
  },
  methods: {
    saveClickedMovie(winner, loser) {
        // console.log('movies : ' + this.movies.length + '  |  nmbr : ' + this.nmbr.length);
        if(this.winners.length < this.movies.length/2) {
            this.winners.push(winner)
            this.losers.push(loser)
            console.log(this.winners.length);
            if(this.winners.length < this.movies.length/2-1) {
                this.getRandomMovie()
            }
        } else {
            window.alert("T'as choisis parmis tout les films ghibli")
            console.log(this.winners);
        }
    },
    async setUp() {
      try {
        this.movies = await getAllMovies()
        this.winners.push(this.movies[0].id)
        this.getRandomMovie()
      } catch (e) {
        this.error = e
      }
    },  
    async getRandomMovie() {
      var idx1 = Math.floor(Math.random() * this.movies.length)
      while (this.winners.indexOf(this.movies[idx1].id) != -1 || this.losers.indexOf(this.movies[idx1].id) != -1) {
          idx1 = Math.floor(Math.random() * this.movies.length)
      }
    //   console.log('winner : ' + this.winners.indexOf(this.movies[idx1].id));
    //   console.log(this.winners);
    //   console.log('loser : ' + this.losers.indexOf(this.movies[idx1].id));
    //   console.log(this.losers);
      this.movie1 = this.movies[idx1]

      var idx2 = Math.floor(Math.random() * this.movies.length)
        // console.log(this.nmbr.indexOf(this.movies[idx2].id));
      while (idx2 == idx1 || this.winners.indexOf(this.movies[idx2].id) != -1 || this.losers.indexOf(this.movies[idx2].id) != -1) {
        idx2 = Math.floor(Math.random() * this.movies.length)
      }
      this.movie2 = this.movies[idx2]
    },
  },
  async mounted() {
    return this.setUp()
  },
};
</script>
<style>
.versus {
    vertical-align: middle;
    text-align: center;
    font-size: 50;
    height: 500;
}
</style>
