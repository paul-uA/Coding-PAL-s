const express = require("express")
const router = express.Router()
const owners = require("../models/Owners")

// "Index" Route
router.get('/',(req, res) => {
    owners.find({}, (err, ownersDB) => {
        res.render('./Owner-files/index.ejs', {owner:ownersDB})
})
})
// "New" Route
// router.get('/new', (req, res) => {
//     res.render('./Owner-files/new.ejs')
// })
// "Show Route"
router.get('/:id', (req, res) => {
    const id= req.params.id
    owners.findById(id, (err, foundOwner)=> {
        res.render('./Owner-files/show.ejs', {owner: foundOwner})
    })
})


// "Edit Route"
// router.get('/:id/edit', (req, res) => {
//     res.send("This is the edit page")
// })


// "Create Route"
// router.post('/',(req, res) => {
//     res.send("This is the create route")
// })


// "Destroy Route"
// router.delete('/:id', (req, res) => {
//     res.send("This is the delete route")
// })


// "Update Route"
// router.put('/:id', (req, res) => {
//     res.send("This is the update route")
// })

module.exports = router