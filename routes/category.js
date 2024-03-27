const express = require('express');
const Category = require('../model/category.model');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// setting multer for category logo....!
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "Upload/category_logo");
    },
    filename:(req, file, cb) => {
        cb(null, Date.now()+ path.extname(file.originalname));
    },
});

const uploadLogo = multer({storage:storage});

// create category.............!

router.post('/create', uploadLogo.single("logo"), async (req, res) =>{
    console.log('cstegory ctrate:==', req.body,req.file);
    try {
        let logoUrl;
        if(req.file && req.file.filename){
            logoUrl = `${req.protocol}://${req.headers.host}/api/category/logo/`+ req.file.filename;
        } else {
            iconUrl = "https://www.beelights.gr/assets/images/empty-image.png"
        }
        const newCategory = new Category({
            category_name: req.body.category_name,
            description: req.body.description,
            status: req.body.status,
            logo:logoUrl
        });
        await newCategory.save();
        console.log("created data:", newCategory);
        res.status(200).json(newCategory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// update category........!
router.put('/update/:id',uploadLogo.single("logo"),async (req, res)=>{
    console.log("update date:==", req.body,req.file);
    let logoUrl;
        if(req.file && req.file.filename){
            console.log("inside condition")
            logoUrl = `${req.protocol}://${req.headers.host}/api/category/logo/`+ req.file.filename;
        } else {
            logoUrl = "https://www.beelights.gr/assets/images/empty-image.png"
        }
    try {
        const update =  await Category.findByIdAndUpdate(
            req.params.id,
            req.file ? {
                ...req.body,
                logo:logoUrl,
            }
            :{
                ...req.body,
            }
        );
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// delete category........!
router.delete("/remove/:id", async (req, res)=>{
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Category deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// get all category..........!
router.get("/all-category", async (req, res)=>{
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

// get logos......!
router.get('/logo/:logoName', (req,res)=>{
    const imageName = req.params.logoName;
    const imagesFolder = path.join(__dirname, "../Upload", "category_logo");
    const imagePath = path.join(imagesFolder, imageName);
    res.sendFile(imagePath);
});

module.exports = router;