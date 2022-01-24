const express = require("express")
const route = express.Router()
const owners = require("../models/Owners")

// "Index" Route
router.get('/',(req, res) => {
    res.send("This is the Index Route")
})



// "New" Route
router.get('/new', (req, res) => {
    res.send("This is the new route")
})


// "Show Route"
router.get('/:id', (req, res) => {
    res.send("This is the show route")
})


// "Edit Route"
router.get('/:id/edit', (req, res) => {
    res.send("This is the edit page")
})


// "Create Route"
router.post('/',(req, res) => {
    res.send("This is the create route")
})


// "Destroy Route"
router.delete('/:id', (req, res) => {
    res.send("This is the delete route")
})


// "Update Route"
router.put('/:id', (req, res) => {
    res.send("This is the update route")
})

module.exports = router