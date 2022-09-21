const router = require('express').Router();
const Greenhouse = require('../models/Greenhouse');
const User = require('../models/User');

router.get('/all', async(req,res)=>{
    try{
        const greenhouse = await Greenhouse.find();
        res.status(200).json(greenhouse);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/all/:id', async(req,res)=>{
    try{
        const userId = req.params.id;
        const greenhouse = await Greenhouse.find({owner:userId});
        res.status(200).json(greenhouse);
    }catch(error){
        res.status(500).json(error);
    }
});

router.get('/:id', async(req,res)=>{
    try{
        const greenhouseId = req.params.id;
        const greenhouse = await Greenhouse.findById(greenhouseId);
        res.status(200).json(greenhouse);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/name/:greenName', async(req,res)=>{
    try{
        const greenName = req.params.greenName;
        const greenhouse = await Greenhouse.findOne({greenhouse:greenName});
        res.status(200).json(greenhouse);
    }catch(err){
        res.status(500).json(err);
    }
})
router.post('/:owner/new', async(req,res)=>{
    try{
        const newGreenhouse = new Greenhouse({
            greenhouse:req.body.greenhouse,
            location:req.body.location,
            content:req.body.content,
            desc:req.body.desc,
            size:req.body.size,
            owner:req.params.owner,
        });
        const user = await User.findById(req.params.owner);
        const greenhouse = await Greenhouse.findOne({greenhouse:req.body.greenhouse});
        if(greenhouse){res.status(409).json("Duplicate data")}else{
            newGreenhouse.save(async function(err){
                user.list.push(newGreenhouse);
                user.save(function(err){
                });
            }); 
            res.status(200).json(newGreenhouse);
        }
    }catch(err){ 
        res.status(500).json(err);
    }
});

//Update temperature element of greenhouse
router.put('/temp/:id', async(req,res)=>{
    try{
        const greenhouseId = req.params.id;
        const green = await Greenhouse.updateOne({_id:greenhouseId},{
            $set:{'temperature.temp':req.body.temp,'temperature.auto':req.body.auto,
            'temperature.time':req.body.time,'temperature.date':req.body.date}});
        res.status(200).json(green);
    }catch(err){
        res.status(500).json(err);
    }
});

router.put('/irrigation/:id', async(req,res)=>{
    try{
        const greenhouseId = req.params.id;
        const green = await Greenhouse.updateOne({_id:greenhouseId},{
            $set:{'water.percentage':req.body.percentage,'water.amount':req.body.amount,
        'water.watering':req.body.watering,'water.auto':req.body.auto,
        'water.fertilizer':req.body.fertilizer,'water.time':req.body.time,'water.date':req.body.date}});
        res.status(200).json(green);
    }catch(err){
        res.status(500).json(err);
    }
});

router.put('/co2/:id', async(req,res)=>{
    try{
        const greenhouseId = req.params.id;
        const green = await Greenhouse.updateOne({_id:greenhouseId},{
            $set:{'co2.fan1':req.body.fan1,'co2.fan2':req.body.fan2,
            'co2.speed':req.body.speed,'co2.run':req.body.run, 
            'co2.auto':req.body.auto,'co2.time':req.body.time,'co2.date':req.body.date}});
        res.status(200).json(green);
    }catch(err){
        res.status(500).json(err);
    }
});

router.put('/light/:id', async(req,res)=>{
    try{
        const greenhouseId = req.params.id;
        const green = await Greenhouse.updateOne({_id:greenhouseId},{
            $set:{'light.intensity':req.body.intensity,'light.run':req.body.run,
            'light.auto':req.body.auto,'light.time':req.body.time,'light.date':req.body.date}});
        res.status(200).json(green);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
