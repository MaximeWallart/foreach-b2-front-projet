<template>
    <v-container>
        tests
        <v-img :src="movie.image">

        </v-img>
    </v-container>
</template>
<script>
import {getAllMovies} from '../apis/movies'

export default {
    data() {
        return {
            movies: {},
            movie: {},
            error: "",
        }
    },
    methods: {
        async getAllMovies() {
            try {
                this.movies = await getAllMovies()
            } catch(e) {
                this.error = e
            }
        },
        async getRandomMovie() {
            this.getAllMovies()
            const idx = Math.floor(Math.random() * this.images.length)
            this.movie = this.movies[idx]
            console.log(this.movie.title);
        }
    },
    async mounted() {
        return this.getRandomMovie()
    }
}
</script>