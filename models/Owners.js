const mongoose = require('mongoose')

const ownersSchema = new mongoose.Schema({
    name:{
        type: String, require: true, default: 'PAL' 
    },
    hobbies:[String],
    tvShows:[String],
    favoriteDogActivity:[String]
},{timestamps:true})

