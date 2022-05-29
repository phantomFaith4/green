const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    origin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Greenhouse',
    }
},
    {timestamps:true},
);

module.exports = mongoose.model('Notification', NotificationSchema)