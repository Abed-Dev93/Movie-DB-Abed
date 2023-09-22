const express = require('express')
const app = express()
const date = new Date()
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

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

app.get('/movies/create', (req, res) => {

})

app.get('/movies/read', (req, res) => {
    res.status(200).json({status: 200, data: movies })
})

app.get('/movies/update', (req, res) => {
    
})

app.get('/movies/delete', (req, res) => {
    
})

app.listen(3000)