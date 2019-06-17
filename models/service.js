const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//ESTE NO LO ESTOY USANDO BORRAR
const serviceSchema = new Schema({
    name:{type:String,required:true},
    description:{type:String},
    price:{type:String,required:true},
    schedule:{
        days:{type:String},
        schedule:{type:String}
    }    
},{timestamps:true});

module.exports = mongoose.model('Service',serviceSchema);