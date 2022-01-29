<template>
    <v-container>
        <h1>
            Page to show all movies:
        </h1>

        <ul>
            <li v-for="movie in movies" :key="movie.id">
                <a href="'https://fr.wikipedia.org/wiki/' + movie.title">{{ movie.title }}</a>
            </li>
        </ul>
    </v-container>
</template>
<script>
import {getAllMovies} from '../apis/movies'

export default {
    data() {
        return {
            movies: {},
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
        }
    },
    async mounted() {
        return this.getAllMovies()
    }

}
</script>