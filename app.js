// Dependencies
const express =require('express')
const cors = require('cors')
const app = express()




//controlers
const dogsController = require("./controllers/dogsC")
const ownerController= require("./controllers/ownersC")
const usersController= require("./controllers/usersC")
const uploadsController = require('./controllers/uploadsC')

const PORT = process.env.PORT || 3000


const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dogOwnersDB"
const methodOverride = require('method-override')


const Owners = require('./models/Owners')

//img upload 



mongoose.connect(MONGODB_URI,()=>{console.log('mongoose connected')})



// Configuring
app.set('view engine', 'ejs')

// Database Models



// Middleware
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))
app.use(express.static((__dirname, 'public')));

// redirect from localhost:3000

app.get('/', (req,res)=>{
  console.log("something here!!!+++T$TFREGFD GDFG ")
    Owners.find({}, (err, ownerDB) => {
      if (err) {
        console.error(err)
        res.send(err)
    }else{
      console.log("ATLAS RESPONDED!!!!@ ~#E")
        res.render("home.ejs", {owner:ownerDB})  
      }
    })
   
})

// our app home page
app.get('/Code-Pals',(req, res) => {
    Owners.find({}, (err, ownerDB) => {
      res.render("home.ejs", {owner:ownerDB})  
    })

})

// // our app login page
// app.get('/auth',(req, res) => {    
//       res.render("./Login-files/loginU.ejs",)  

// })

app.use('/auth', usersController)
app.use('/upload',uploadsController)
app.use('/dogs', dogsController)
app.use('/owners', ownerController)


// "Start the server"
app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`)
})