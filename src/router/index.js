import Vue from "vue"
import Router from "vue-router"

import * as names from './names'

import ShowAllMovies from '../views/ShowAllMovies.vue'
import ErrorPage from '../views/ErrorPage.vue'

Vue.use(Router)

const routes = [
    {
        path: '/showallmovies',
        name: names.SHOWALLMOVIES,
        component: ShowAllMovies,
    },
    {
        path: '/errorpage',
        name: names.ERRORPAGE,
        component: ErrorPage,
    }
]

const router = new Router({
    routes,
})

export default router