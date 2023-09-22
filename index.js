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

app.listen(3000)