const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        data:Buffer,
        contentType:String,
    },
    name:{
        type:String,
    },
    lastname:{
        type:String,
    },
    phone:{
        type:String,
    },
    list:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Greenhouse',
    }],
},
{timestamps:true}
);

module.exports = mongoose.model('User',UserSchema);