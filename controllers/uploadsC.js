const express = require("express")
const router = express.Router()
const multer = require('multer')
const upload = multer()
const owners = require("../models/Owners")


const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const clConfig = require("../api-config");

cloudinary.config(clConfig);



router.get('/single-file',(req,res)=>{
    res.render('./ImgUP-files/upload.ejs')
})

router.post("/single-file/:id", upload.single("imageUpload"), function (req, res, next) {
  //our uploading function that returns a promise and also streams the inputed files to the cloudinary servers using the streamifier package
  console.log('Start Upload from form', req.params.id)
  const oID = req.params.id
  let streamUpload = (req) => {
    // defining a return value that returns a new promise object 
    return new Promise((resolve, reject) => {
    // the Promise object is instanciated with a function/callback that will be provided two arguments(resolve & reject):
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        // Local variable: stream  >>  cloudinary.uploader.upload_stream also returns a promise providing two values 
        // Expected outcomes: 1. result or 2. an error 
        // Condition 1: Is there a result? (ie does the result have a value ? 
        // Condition 2: result is undefined, or is an empty object then the reject function is called and the error is provided
 
        if (result) {
            // resolve > result 
            // what does resolve do? - 
            // result is successful(has value) -  we use resolve when ... promise is fulfilled - 
            // resolve is provided by the promise > 
          resolve(result);
        } else {
            // if there is problem complete promise but return error object from cloudinary
          reject(error);
        }
      });
      // this code integrates our   
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
      owners.findByIdAndUpdate(oID,{img:result.url},{new:true},(err,foundOwner)=>{
        if(err){
             console.log(err)
            res.json(err)
        }
        else{
          console.log(foundOwner,"THis is working")
          res.redirect(`/owners/${req.params.id}`)
        }
    })
      // Result will be resolved value returned by Cloudinary upload promise- you can capture just the properties you want to construct a seeder object to pass to your DB processes.
      //res.redirect("/");
      
    } catch (err) {
      console.log(err)
      res.send(err);
    }
  }

  // our synchronous function call that gets the whole process started
  console.log("Upload Button")
  upload(req);
}
);

module.exports=router
