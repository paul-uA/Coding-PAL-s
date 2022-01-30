const express = require ("express")
const route = express.Router()
const dogs = require ("../models/Dogs")

const multer = require('multer')
const upload = multer()

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const clConfig = require("../api-config");

cloudinary.config(clConfig);


// "Index" Route
route.get('/',(req, res) => {
    dogs.find({}, (err, dogsDB) => {
      res.render("./Dogs-files/index.ejs", {dog:dogsDB})  
    })

})




// "New" Route
route.get('/new', (req, res) => {
    res.render("./Dogs-files/new.ejs")
    // res.send("new route")
})


// "Show Route"
route.get('/:id', (req, res) => {
    const id = req.params.id
    dogs.findById(id,(err, foundDog) => {
        console.log(foundDog)
        res.render("./Dogs-files/show.ejs", {dog:foundDog})
    })
    
})

// "Edit Route with uploading profile picture"
route.get('/:id/single-file', (req, res) => {
    console.log(req.params.id)
    res.render('./Dogs-files/uploadD.ejs', {id: req.params.id})

})


// "Edit Route"
route.get('/:id/edit', (req, res) => {
    dogs.findById(req.params.id, (err, foundDog) =>{
    if(err) {
        return res.send(err)
    }else{
        res.render("./dogs-files/edit.ejs",
        {dog: foundDog, id:req.params.id})
    }
})

})


// "Create Route"
route.post('/',(req, res) => {
    if (req.body.fixed === "on") {
        req.body.fixed = true;
      } else {
        req.body.fixed = false;
      }
    dogs.create(req.body, (err, createdDog) => {
        if(err) {
            console.log(err)
        }else{
            
            res.redirect("/dogs")

        }
        
    })
    
})




// "Destroy Route"
route.delete('/:id', (req, res) => {
    dogs.findByIdAndDelete(req.params.id, (err,deleteMsg) =>{
        console.log(deleteMsg)
        res.redirect("/dogs")

    })
    
})

// "Update Route"
route.put('/:id', (req, res) => {
    dogs.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedDog) => {
        if(err){
            return res.send(err)
        }
        console.log(updatedDog)
        res.redirect("/dogs/" +req.params.id)
    })  
})

route.put('/:id/single-file', upload.single("imageUpload") ,(req, res) => {
    console.log("IM HERE")
    const oID = req.params.id
    //console.log(req.params)
    let streamUpload = (req) => { return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
                console.log(result);
            resolve(result);
          } else {
            reject(error);
          }
        });
        // our request objects file information is made available through the req.file.buffer
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    // our initializer for the 'streamUpload process'

    async function upload(req) {
      try {
          let result = await streamUpload(req);
        // the variable result will return the resolved promise's result value (the object we see in our console)
        // the information from this object can then be made available to other parts of our application (ie Sequelize db methods)
        console.log("req.body")  
        console.log(req.body);
        // This will be the text field data from our form submission - you might use this data for identifiying meta information provided by your upload form
        console.log('result')
        console.log(result)  
        dogs.findByIdAndUpdate(oID,{$push:{img:result.url}},{new:true},(err,foundDog)=>{
            if(err){
                console.log(err)
            res.json(err)
            }
            else{
                console.log(foundDog,"THis is working")
                res.redirect(`/dogs/${oID}`)
              }
        })
        // Result will be resolved value returned by Cloudinary upload promise- you can capture just the properties you want to construct a seeder object to pass to your DB processes.
        //res.redirect(`/${oID}`)
          } catch (err) {
          console.log(err);
          }
        }

    // our synchronous function call that gets the whole process started
    console.log("button Push")

    upload(req);
  
})

module.exports=route
