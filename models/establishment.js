const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const establishmentSchema = new Schema({
    name:{type:String,required:true},
    description:{type:String},
    generalScore:{type:Number,default:0},
    comments:[{
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        username:{type:String,default:''},
        comment:{type:String,default:''}
    }],
    services:[{
        type: Schema.Types.ObjectId,
        ref:'GeneralService'
    }],
    numberOfScores:{type:Number,default:0},    
    reputation:{type:String}
    },
    { timestamps: true }
);

module.exports = mongoose.model('Establishment',establishmentSchema);