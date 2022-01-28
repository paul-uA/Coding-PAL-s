const mongoose = require('mongoose')

const ownersSchema = new mongoose.Schema({
    name:{
        type: String, require: true, default: 'PAL' 
    },
    hobbies:[String],
    tvShows:[String],
    favoriteDogActivity:[String],
    dogs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dogs'
    }],
    img:{
        type: String
    }
},{timestamps:true})

const Owners = mongoose.model("Owners", ownersSchema)
module.exports = Owners