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
    // res.send("new route")
})


// "Show Route"
route.get('/:id', (req, res) => {
    const id = req.params.id
    dogs.findById(id,(err, foundDog) => {
        console.log(foundDog)
        res.render("./Dogs-files/show.ejs", {dog:foundDog})
    })
    
})


// "Edit Route"
route.get('/:id/edit', (req, res) => {
    dogs.findById(req.params.id, (err, foundDog) =>{
    if(err) {
        return res.send(err)
    }else{
        res.render("./dogs-files/edit.ejs",
        {dog: foundDog, id:req.params.id})
    }
})

})


// "Create Route"
route.post('/',(req, res) => {
    dogs.create(req.body, (err, createdDog) => {
        res.redirect("./dogs")
    })
    
})


// "Destroy Route"
route.delete('/:id', (req, res) => {
    dogs.findByIdAndDelete(req.params.id, (err,deleteMsg) =>{
        console.log(deleteMsg)
        res.redirect("/dogs")

    })
    
})


// "Update Route"
route.put('/:id', (req, res) => {
    dogs.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedDog) => {
        if(err){
            return res.send(err)
        }
        console.log(updatedDog)
        res.redirect("/dogs/" +req.params.id)
    })  
})

module.exports=route
