// Dependencies
const { resolveNaptr } = require('dns')
const express =require('express')
const { METHODS } = require('http')

const app = express()

const PORT = 5000
const mongoose = require('mongoose')
const URI = "mongodb://127.0.0.1:27017/"
const methodOverride = require('method-override')

// const owner = require('.models/Owners.js')
const dogs = require('./models/Dogs')

mongoose.connect(URI,()=>console.log('mongoose connected'))

// Configuring
app.set('view engine', 'ejs')

// Database Models


// Middleware
app.use(methodOverride('method'))
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))



// "Index" Route
app.get('/Dogs',(req, res) => {
    dogs.find({}, (err, dogsDB) =>{
      res.render("index.ejs", {dog:dogsDB})  
    })

})



// "New" Route
app.get('/Dogs/new', (req, res) => {
    res.send("This is the new route")
})


// "Show Route"
app.get('/Dogs/:id', (req, res) => {
    res.send("This is the show route")
})


// "Edit Route"
app.get('/Dogs/:id/edit', (req, res) => {
    res.send("This is the edit page")
})


// "Create Route"
app.post('/Dogs',(req, res) => {
    res.send("This is the create route")
})


// "Destroy Route"
app.delete('Dogs/:id', (req, res) => {
    res.send("This is the delete route")
})


// "Update Route"
app.put('/Dogs/:id', (req, res) => {
    res.send("This is the update route")
})



// "Start the server"
app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`)
})