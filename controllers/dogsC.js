const express = require ("express")
const route = express.Router()
const dogs = require ("../models/Dogs")


// "Index" Route
route.get('/',(req, res) => {
    dogs.find({}, (err, dogsDB) => {
      res.render("./Dogs-files/index.ejs", {dog:dogsDB})  
    })

})


// "New" Route
route.get('/new', (req, res) => {
    res.render("./Dogs-files/new.ejs")
})


// "Show Route"
route.get('/:id', (req, res) => {
    res.render("./Dogs-files/show.ejs")
})


// "Edit Route"
route.get('/:id/edit', (req, res) => {
    res.render("./Dogs-files/edit.ejs")
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
