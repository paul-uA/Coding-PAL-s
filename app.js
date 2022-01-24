// Dependencies
const express =require('express')
const { METHODS } = require('http')
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




// "New" Route



// "Show Route"



// "Edit Route"



// "Create Route"



// "Destroy Route"



// "Update Route"



// "Start the server"
app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`)
})