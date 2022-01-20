import Vue from "vue"
import Router from "vue-router"

import * as names from './names'

import ShowAllMovies from '../views/ShowAllMovies.vue'
import ErrorPage from '../views/ErrorPage.vue'
import CompareMovies from '../views/CompareMovies.vue'

Vue.use(Router)

const routes = [
    {
        path: '*',
        name: names.ERRORPAGE,
        component: ErrorPage,
    },
    {
        path: '/showallmovies',
        name: names.SHOWALLMOVIES,
        component: ShowAllMovies,
    },
    {
        path: '/comparemovies',
        name : names.COMPAREMOVIES,
        component: CompareMovies
    }
]

const router = new Router({
    routes,
})

export default router