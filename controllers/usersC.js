const express = require('express')
const router = express.Router()
// insert the model (User)
const User = require('../models/User')
const bcrypt = require('bcrypt')


// Auth routing

router.post('/login', (req,res)=>{
    const credentials = req.body

    User.findOne({username: credentials.username}, (err,foundUser)=>{
        if(err){
            res.send(err)
        }else{
            console.log(foundUser)
            // res.send(foundUser)
            if(!foundUser.password){
                console.log('no user found')
                res.redirect('/')
            }else{
                const testPassword = bcrypt.compareSync(credentials.password, foundUser.password)
                // es.send(testPassword)
                if(testPassword){
                    console.log('logged in get ready for sessions')
                    res.send('logged in ' + foundUser.username)
                }else{
                    res.send('incorrect password or username')
                }
            }
        }
    })
})


router.post('/register', (req,res)=>{
    const userData = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(userData.password,salt)
    console.log(userData,salt)

    userData.password = hashedPassword
    User.create(userData,(err,createdUser)=>{
        if(err){
            res.send(err)
        }else{
            res.send(createdUser)
        }
    })
    //res.send('HashedPassword: ' + hashedPassword)
})

router.get('/logout', (req,res)=>res.send('logout route'))

module.exports = router
