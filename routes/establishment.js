const express = require('express');
const { body } = require('express-validator/check');
const isAuth = require('../middlewares/isauth');
const establishmentController = require('../controllers/establishment');
const router = express.Router();

//Get all the establishments
router.get('/establishment',establishmentController.getEstablishments);
//router.get('/establishment',isAuth,establishmentController.getEstablishments);


//Create establishment
router.post('/establishment',[
    body('name').trim().isLength({min:1,max:50})
],establishmentController.createEstablishment);

//Create a service
router.post("/establishment/:id/service",establishmentController.createService);

module.exports = router;