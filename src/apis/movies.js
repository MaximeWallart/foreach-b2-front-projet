import axios from 'axios'

const movieInstance = axios.create({
    baseURL: "https://ghibliapi.herokuapp.com"
})

export async function getAllMovies() {
    try {
        const { data } = await movieInstance.get('/films')

        return data
    } catch(e) {
        if(e.response.status == 404) {
            throw new Error("Il y a un problème d'url")
        }
        throw new Error("Une erreur est survenue")
    }
}
export async function getMovie(id) {
    try {
        const {data} = await movieInstance.get(`/films/${id}`)

        return data
    } catch(e) {
        if(e.response.status == 404) {
            throw new Error("Error while getting the movie")
        }
        throw new Error("Une erreur est survenue")
    }
}