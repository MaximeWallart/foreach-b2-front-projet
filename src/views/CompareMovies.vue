<template>
    <v-container>
        <v-row>
        <v-col>
            <v-img 
                contain
                :src=movie1.image
                max-height="500"
                max-width="500"
            />
        </v-col>
        <v-col>VS</v-col>
        <v-col>
            <v-img
                contain
                :src=movie2.image
                max-height="500"
                max_width="500"
            />
        </v-col>
        </v-row>
    </v-container>
</template>
<script>
import {getAllMovies} from '../apis/movies'

export default {
    data() {
        return {
            movies: {},
            movie1: {},
            movie2: {},
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
            await this.getAllMovies()
            const idx1 = Math.floor(Math.random() * this.movies.length)
            this.movie1 = this.movies[idx1]
            const idx2 = Math.floor(Math.random() * this.movies.length)
            this.movie2 = this.movies[idx2]
        }
    },
    async mounted() {
        return this.getRandomMovie()
    }
}
</script>