const express = require("express")
const router = express.Router()
const owners = require("../models/Owners")

const multer = require('multer')
const upload = multer()

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const clConfig = require("../api-config");

cloudinary.config(clConfig);



// "Index" Route
router.get('/',(req, res) => {
    owners.find({}, (err, ownersDB) => {
        res.render('./Owner-files/index.ejs', {owner:ownersDB})
})
})
// "New" Route
router.get('/new', (req, res) => {
    res.render('./Owner-files/new.ejs')
})
// "Show Route"
router.get('/:id', (req, res) => {
    const id= req.params.id
    owners.findById(id, (err, foundOwner,id)=> {
        res.render('./Owner-files/show.ejs', {owner: foundOwner})
    })
})

// "Edit Route with uploading profile picture"
router.get('/:id/upload/single-file', (req, res) => {
    
    res.render('./ImgUP-files/upload.ejs', {id: req.params.id})

})

// "Edit Route"
router.get('/:id/edit', (req, res) => {
    res.send("This is the edit page")
})


// "Create Route"
// router.post('/',(req, res) => {
    //     res.send("This is the create route")
// })


// "Destroy Route"
// router.delete('/:id', (req, res) => {
    //     res.send("This is the delete route")
    // })

    //owner/61f07f99b53db05048310898/upload/single-file
// "Update with profile picture"
router.post('/:id/upload', upload.single("imageUpload") ,(req, res) => {
    console.log("IM HERE")
    const id = req.params
    console.log(req.params)
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
        owners.findOneAndUpdate(req.params,{img:result.url},{new:true},(err,foundOwner)=>{
            if(err){
                return res.send(err)
            }
            console.log(foundOwner)
        })
        // Result will be resolved value returned by Cloudinary upload promise- you can capture just the properties you want to construct a seeder object to pass to your DB processes.
        res.redirect(`/:${id}`)
          } catch (err) {
          res.send(err);
          }
        }

    // our synchronous function call that gets the whole process started
    console.log("button Push")

    upload(req);
  
})



// "Update Route"
// router.put('/:id', (req, res) => {
//     res.send("This is the update route")
// })

module.exports = router