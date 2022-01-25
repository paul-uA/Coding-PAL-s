const { response } = require("express")
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
    dogs.findById(req.params.id,(err, foundDog) => {
        res.render("./Dogs-files/show.ejs", {dog:foundDog})
    })
    
})


// "Edit Route"
route.get('/:id/edit', (req, res) => {
    // dogs.findById(req.params.id, (err, dogToEdit) => {

    // })
    res.render("./Dogs-files/edit.ejs")
})


// "Create Route"
route.post('/',(req, res) => {
    // dogs.create(req.body, (err, newDog) => {

    // })
    res.send("This is the create route")
})


// "Destroy Route"
route.delete('/:id', (req, res) => {
    // dogs.findByIdAndDelete(req.params.id, (err,response) => {

    // })
    res.send("This is the delete route")
})


// "Update Route"
route.put('/:id', (req, res) => {
    // dogs.findByIdAndUpdate(req.params.id, (err, response) => {

    // })
    res.send("This is the update route")
})

module.exports=route
