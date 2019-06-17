const express = require('express');
const Establishment = require('../models/establishment');
const Service = require('../models/service'); //CAMBIAR NOMBRE A SERVICE EN MODEL
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

exports.createEstablishment = (req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            message:'Validation failed, entered data is incorrect',errors:errors.array()
        });
    }
    let body = req.body;
    let establishment = new Establishment({
        name : body.name,
        description: body.description
    });
    establishment.save().then(result=>{
        return res.status(201).json({
            message: 'Establishment created successfully!',
            post:result
        });
    }).catch(err=>{
        return res.status(500).json({
            message:'Internal server error',
            error:err
        });
    });    
}

//Services

exports.createService = (req,res,next)=>{
   let body = req.body;
   Establishment.findById(req.params.id).then(
       establishment=>{
           if(establishment){
            let service = new Service({
                name:body.name,
                description:body.description
            });
            service.save().then(
                result=>{
                    //update in establishment
                    establishment.services.push(service);
                    establishment.save().then(
                        establishUpdated=>{
                            return res.status(201).json({
                                message:'created!',
                                created:result
                            });
                        }
                    ).catch(
                        err=>{
                            return res.status(500).json({
                                message:'internal server error',
                                error:err
                            });
                        }
                    );                  
                }
            ).catch(
                err=>{
                    return res.status(500).json({
                        message:'internal server error',
                        error:err
                    });
                }
            )
           }
       }
   ).catch(); 
}

