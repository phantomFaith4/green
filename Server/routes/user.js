const Greenhouse = require('../models/Greenhouse');
const User = require('../models/User');
const router = require('express').Router();

router.get('/:id', async(req,res)=>{
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    };
});

//db.menus.update({menusName : "333"},{$pull : { children : { menusName : "333" }}})
//delete Greenhouse from Greenhouse Collection and From User reference
router.put('/:gid',async(req,res)=>{
    try{
        const gid = req.params.gid;
        console.log("GID",gid);
        try{
            const user = await User.updateOne({},{$pull:{list: req.params.gid}});
            const greenhouse = await Greenhouse.deleteOne({_id:req.params.gid});
            res.status(200).json("Greenhouse HAS BEEN DELETED !!!");
        }catch(err){}
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;