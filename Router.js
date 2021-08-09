const express = require("express");
const router = express.Router();
const model = require("./model") 
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2

cloudinary.config({ 
    cloud_name: 'drgvu7vxa', 
    api_key: '149993817168625', 
    api_secret: 'NfZdLmcrYDFfKCq8-j_gWqpAcds' 
  });
  
  const storage = multer.diskStorage({
      destination: (req, file, cb) =>{
        cb(null, './uploads')
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      }
    })
     
    const upload = multer({ storage: storage })

router.post("/", upload.single("image"), async (req,res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        console.log(result)

        const newData = await model.create({
            name:req.body.name,
            club:req.body.club,
            country:req.body.country,
            age:req.body.age,
            foot:req.body.foot,
            cloud_id:result.public_id,
            image:result.secure_url,
            path:req.file.path,
      
        })
        res.status(201).json({
            message:"successful",
            data: newData,
        })
    }catch (error) {
        res.status(400).json({
            message:"error.message",
            data:"error"
        })
    }
})

router.get("/", async (req,res) => {
    try{
        const newData = await model.find()
        res.status(200).json({
            message:"succeful",
            data: newData,
        })
    }catch (error) {
        res.status(404).json({
            message: error,
        })
    }
})

module.exports = router;