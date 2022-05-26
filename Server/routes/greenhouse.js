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
            content:req.body.content,
            location:req.body.location,
            owner:req.params.owner,
        });
        const user = await User.findById(req.params.owner);
        newGreenhouse.save(async function(err){
            user.list.push(newGreenhouse);
            user.save(function(err){
            });
        });
        res.status(200).json(newGreenhouse);
    }catch(err){ 
        res.status(500).json(err);
    }
});
//db.menus.update({menusName : "333"},{$pull : { children : { menusName : "333" }}})
router.put('/temp/:id', async(req,res)=>{
    try{
        const greenhouseId = req.params.id;
        const update = {
            temp:req.body.temperature,
            auto:req.body.automatic,
            time:req.body.time,
            date:req.body.date,
        }
        const green = await Greenhouse.updateOne({_id:req.params.id},{
            $set:{'temperature.temp':req.body.temp,'temperature.auto':req.body.automatic,
            'temperature.time':req.body.time,'temperature.date':req.body.date}});
        res.status(200).json(green);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
