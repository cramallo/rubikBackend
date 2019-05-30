const express = require('express');
const { body } = require('express-validator/check');
const isAuth = require('../middlewares/isauth');
const establishmentController = require('../controllers/establishment');

const router = express.Router();

router.get('/establishment',isAuth,establishmentController.getEstablishments);

router.post('/establishment',[
    body('name').trim().isLength({min:1,max:10})
],establishmentController.createPost);

module.exports = router;