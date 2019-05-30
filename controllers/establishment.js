const express = require('express');
const Establishment = require('../models/establishment');
const { validationResult } = require('express-validator/check');

exports.getEstablishments = (req,res,next)=>{
    let body = req.body;
    Establishment.find()
    .then(establishments=>{
        return res.status(200).json({
            establishments : establishments
        });
    })
    .catch(error=>{
        return res.status(500).json({
            message:'Internal server error'
        });
    });
}

exports.createPost = (req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            message:'Validation failed, entered data is incorrect',errors:errors.array()
        });
    }
    let body = req.body;
    let establishment = new Establishment({
        name : body.name
    });
    establishment.save().then(result=>{
        res.status(201).json({
            message: 'Establishment created successfully!',
            post:result
        });
    }).catch(err=>{
        console.log(err);
    });    
}