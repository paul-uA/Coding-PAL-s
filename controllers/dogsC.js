const express = require ("express")
const route = express.Router()
const dogs = require ("../models/Dogs")


// "Index" Route
route.get('/',(req, res) => {
    dogs.find({}, (err, dogsDB) =>{
      res.render("index.ejs", {dog:dogsDB})  
    })

})


// "New" Route
route.get('/new', (req, res) => {
    res.send("This is the new route")
})


// "Show Route"
route.get('/:id', (req, res) => {
    res.send("This is the show route")
})


// "Edit Route"
route.get('/:id/edit', (req, res) => {
    res.send("This is the edit page")
})


// "Create Route"
route.post('/',(req, res) => {
    res.send("This is the create route")
})


// "Destroy Route"
route.delete('/:id', (req, res) => {
    res.send("This is the delete route")
})


// "Update Route"
route.put('/:id', (req, res) => {
    res.send("This is the update route")
})

module.exports=route
