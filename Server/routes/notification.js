const router = require('express').Router();
const Greenhouse = require('../models/Greenhouse');
const Notification = require('../models/Notification');

router.get('/all', async(req,res)=>{
    try{
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    }catch(err){
        res.status(500).json(err);
    }
});
router.get('/all/:gid', async(req,res)=>{
    try{
        const greenhouseId = req.params.gid;
        const notifications = await Notification.find({origin:greenhouseId})
        res.status(200).json(notifications);
    }catch(err){
        res.status(500).json(err);
    }
});
router.post('/new/:gid', async(req,res)=>{
    try{
        const newNotification = new Notification({
            text:req.body.text,
            location:req.body.location,
            origin:req.params.gid,
        });
        const greenhouse = await Greenhouse.findById(req.params.gid);
        newNotification.save(async function(err){
            greenhouse.notification.push(newNotification);
            greenhouse.save(function(err){
            });
        });
        res.status(200).json("New notification ADDED");
    }catch(err){
        res.status(500).json(err);
    }
});
module.exports = router;