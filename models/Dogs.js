const mongoose = require('mongoose')

const dogPALSchema = new mongoose.Schema({
    name:{
        type: String, require: true, default: 'Fido' 
    },
    age:{
        type: Number, require:true,
    },
    breed:{
        type: String, require:true, default: 1
    },
    fixed:{
        type: Boolean, require
    }
},{timestamps:true})
