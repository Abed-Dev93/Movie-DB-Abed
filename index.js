const express = require('express')
const app = express()
const date = new Date()

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

app.listen(3000)