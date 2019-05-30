const express = require('express');
const { body } = require('express-validator/check');
const establishmentController = require('../controllers/establishment');

const router = express.Router();

router.post('/establishment',[
    body('name').trim().isLength({min:1,max:10})
],establishmentController.createPost);

module.exports = router;