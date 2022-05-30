const mongoose = require('mongoose');

const GreenhouseSchema = new mongoose.Schema({
    greenhouse:{ 
        type:String,
        required:true,
        unique:true,
    },
    location:{
        type:String,
    },
    content:{
        type:String,
        required:true,
    }, 
    desc:{
        type:String,
    },
    size:{
        type:Number,
    }, 
    temperature:{
        temp:{type:Number,},
        auto:{type:Boolean, default:false,},
        time:{type:String,default:'12:34pm'},
        date:{type:String,},
    },
    water:{
        percentage:{type:Number,},
        amount:{type:Number,},
        watering:{type:Boolean,default:false},
        auto:{type:Boolean,default:false},
        fertilizer:{type:Boolean,default:false},
        time:{type:String,default:'12:34pm'},
        date:{type:String,},
    },
    co2:{
        fan1:{type:Boolean,default:false},
        fan2:{type:Boolean,default:false},
        speed:{type:Number},
        run:{type:Boolean,default:false},
        auto:{type:Boolean,default:false},
        time:{type:String,default:'12:34pm'},
        date:{type:String,},
    },
    light:{
        intensity:{type:Number,},
        run:{type:Boolean,default:false},
        auto:{type:Boolean,default:false},
        time:{type:String,default:'12:34pm'},
        date:{type:String,},
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    notification:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Notification',
    }],
},
{timestamps:true}
);

module.exports = mongoose.model('Greenhouse',GreenhouseSchema);