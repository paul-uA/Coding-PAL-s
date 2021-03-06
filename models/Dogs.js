const mongoose = require('mongoose')
const Owners = require('./Owners')

const dogPALSchema = new mongoose.Schema({
    name:{
        type: String, require: true, default: 'Fido' 
    },
    age:{
        type: Number, require:true,
    },
    breed:{
        type: String, require:true, default: 'Dog'
    },
    fixed:{
        type: Boolean, require
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owners'
    },
    img: [String]
},{timestamps:true})

const Dogs = mongoose.model("Dogs", dogPALSchema)
module.exports = Dogs