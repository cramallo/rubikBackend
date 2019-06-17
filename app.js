const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var urlDB = 'mongodb://localhost/rubik';

//Import routes
const establishmentRoutes = require('./routes/establishment');
const authRoutes = require('./routes/auth');

const app = express();

//Middlewares
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

//Routes
app.use('/api',establishmentRoutes);
app.use('/auth', authRoutes);

//Database connection
mongoose.connect(urlDB,{useNewUrlParser : true, connectTimeoutMS:20000}).then(
    ()=>{
        console.log("DB connected");
    },
    err=>{
        console.log("Error to connect to db:"+ err);
    }
);

app.listen(3000,()=>{
    console.log("succefully server conection");
});

