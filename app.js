// Dependencies
const { resolveNaptr } = require('dns')
const express =require('express')
const { METHODS } = require('http')
const { supportsColor } = require('supports-color')
const app = (express)
const PORT = 5000

// Configuring
app.set('view engine', 'ejs')

// Database Models


// Middleware
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(methodOverride('_method'))


// "Index" Route
app.get('/Dogs', (req, res) => {
    res.send("This is the index page")
})



// "New" Route
app.get('/Dogs/new', (req, res) => {
    res.send("This is the new route")
})


// "Show Route"
app.get('/Dogs/:id', (req, res) =>{
    res.send("This is the show route")
})


// "Edit Route"
app.get('/Dogs/:id/edit', (req, res) => {
    res.send("This is the edit route")
})


// "Create Route"
app.post('/Dogs', (req, res) => {
    res.send("This is the create route")
})



// "Destroy Route"
app.delete('/Dogs/:id', (req, res) => {
    res.send("This is the delete route")
})


// "Update Route"
app.put('/fruits/:id', (req, res) => {
    res.send("This is the update route")
})


// "Start the server"
app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`)
})