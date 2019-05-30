const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req,res,next)=>{
    let errors = validationResult(req);
    let body = req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
            messagge:'validation failed',
            errors:errors.array()
        });
    }
    //Hashing password and then saving the user
    bcrypt.hash(body.password,12)
    .then(hashedPass=>{
        let user = new User({
            email:body.email,
            password:hashedPass,
            name:body.name
        });
        return user.save();
    }).then(result=>{
        res.status(201).json({
            message:'User created',
            userId: result._id
        });
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.login = (req,res,next)=>{
    let body = req.body;
    User.findOne({email:body.email})
    .then(user=>{
        if(!user){
          return res.status(401).json({
            message:'User could not be found'
          });
        }
        loadedUser = user;
        return bcrypt.compare(body.password,user.password);
    }).then(isEqual => {
        if(!isEqual){
            return res.status(401).json({
                messagge:'Wrong password'
            });
        }
        //Generate token
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userid: loadedUser._id.toString()
            },
            'superhipersecretsecret',
            { expiresIn:'1h' }
        );
        res.status(200).json({
            token:token,
            userid:loadedUser._id.toString()
        });
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}