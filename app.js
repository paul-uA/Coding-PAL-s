// Dependencies
const express =require('express')
const { METHODS } = require('http')


const app = express()

const dogsController = require("./controllers/dogsC")
const ownerController= require("./controllers/ownersC")
const usersController= require("./controllers/usersC")

const PORT = 3000
const mongoose = require('mongoose')
const URI = "mongodb://127.0.0.1:27017/dogOwnersDB"
const methodOverride = require('method-override')


const Owners = require('./models/Owners')

// const owner = require('.models/Owners.js')
// const owners = require('./models/owners')


mongoose.connect(URI,()=>{console.log('mongoose connected')})



// Configuring
app.set('view engine', 'ejs')

// Database Models


// Middleware
app.use(methodOverride('method'))
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

// redirect from localhost:3000

app.get('/', (req,res)=>{
    res.redirect('/Code-Pals')
})

// our app home page
app.get('/Code-Pals',(req, res) => {
    Owners.find({}, (err, ownerDB) => {
      res.render("home.ejs", {owner:ownerDB})  
    })

})

// our app login page
app.get('/auth',(req, res) => {    
      res.render("./Login-files/loginU.ejs",)  

})
app.use('/auth', usersController)
app.use('/dogs', dogsController)
app.use('/owners', ownerController)


// "Start the server"
app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`)
})