const express = require('express');
const router = express.Router();
const { updateUserPhoto,getUserDetails } = require('../controllers/userController.js'); 

const multer= require("multer");
const {storage}= require("../CloudConfig.js");  //we are not using disk storage now
const upload= multer({storage});  

router.get('/:username/', getUserDetails);
router.post('/:username/photo', upload.single('photo'), updateUserPhoto);

module.exports = router;




