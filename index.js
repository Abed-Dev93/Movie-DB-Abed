const express = require('express')
const app = express()
const date = new Date()
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]
const sortByDate = movies.sort((a,b) => {
    return a.year - b.year
})
const sortByRating = movies.sort((a,b) => {
    return b.rating - a.rating
})
const sortByTitle = movies.slice().sort((a,b) => {
    return a.title.localeCompare(b.title)
})
const readOneMovie = ((id) => {
    return movies.find(movie => movie.title === id)
})
const addMovie = ((title, year, rating) => {
    newMovie = movies.push({ title, year, rating })
    return newMovie
})
const deleteMovie = ((id) => {
    return movies.filter(movie => movie.title !== id)
})
const updateMovieTitle = ((id, change) => {
    const find = movies.find(movie => movie.title === id)
    if (find)
        find.title = change
    return movies
})
const updateMovie = ((id, changeTitle, changeRating, changeYear) => {
    const find = movies.find(movie => movie.title === id)
    if (find) {
        if (changeTitle === undefined) {
            find.title = movies.title
            find.rating = parseFloat(changeRating)
            find.year = Number(changeYear)
        }
        else if (changeRating === undefined) {
            find.rating = movies.rating
            find.title = changeTitle
            find.year = Number(changeYear)
        }
        else if (changeYear === undefined) {
            find.year = movies.year
            find.rating = parseFloat(changeRating)
            find.title = changeTitle
        }
    }
    return movies
})

app.get('/', (req, res) => {
    res.json('ok')
})

app.get('/test', (req, res) => {
    res.status(200).json({status: 200, message: "ok"})
})

app.get('/time', (req, res) =>{
    res.status(200).json({status: 200, message: `${date.getHours()}:${date.getMinutes()}`})
})

app.get('/hello/:id?', (req, res) =>{
    const { id } = req.params
    id ? res.status(200).json({status: 200, message: `Hello, ${id}`}) : res.status(200).json({status: 200, message: 'Hello'})
})

app.get('/search', (req, res) => {
    const queries = req.query.s
    queries ? res.status(200).json({status: 200, message: "ok", data: queries}) : res.status(500).json({status: 500, error: true, message: "you have to provide a search"})
})

app.get('/movies/read', (req, res) => {
    res.status(200).json({status: 200, data: movies })
})

app.get('/movies/read/by-date', (req, res) =>{
    res.status(200).json({status: 200, data: sortByDate })
})

app.get('/movies/read/by-rating', (req, res) =>{
    res.status(200).json({status: 200, data: sortByRating})
})

app.get('/movies/read/by-title', (req, res) => {
    res.status(200).json({status: 200, data: sortByTitle})
})

app.get('/movies/read/id/:id?', (req, res) => {
    const { id } = req.params
    const movie = readOneMovie(id)
    movie ? res.status(200).json({status: 200, data: movie}) : res.status(404).json({status: 404, error: true, message: `the movie ${id} does not exist`})
})

app.get('/movies/add', (req, res) => {
    const { title, year, rating } = req.query
    if (title || year || year.length === 4 || rating) {
        const newMovie = addMovie(title, Number(year), Number(rating))
        res.status(200).json({data: movies})
    }
    else if (!rating || title || year || year.length === 4){
        const newMovie = addMovie(title, Number(year), Number('4'))
        res.status(200).json({data: movies})
    }
    else
        res.status(403).json({status: 403, error: true, message: 'you cannot create a movie without providing a title and a year'})
})

app.get('/movies/delete/:id?', (req, res) => {
    const { id } = req.params
    const movie = deleteMovie(id)
    movie ? res.status(200).json({data: movie}) : res.status(404).json({status: 404, error: true, message: `the movie ${id} does not exist`})
})

app.get('/movies/update/:id?', (req, res) => {
    const { title } = req.query
    const { id } = req.params
    const movie = updateMovieTitle(id, title)
    if (movie)
        res.status(200).json({data: movie})
})

app.get('/movies/update/:id?', (req, res) => {
    const { title, rating, year } = req.query
    const { id } = req.params
    const movie = updateMovie(id, title, rating, year)
    if (movie)
        res.status(200).json({data: movie})
})

app.listen(3000)