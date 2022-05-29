const router = require('express').Router();
require('dotenv').config();
const axios = require('axios'); 

router.get('/:city', async(req,res)=>{
    try{
        const city = req.params.city;
        const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${process.env.OPENWEATHER_KEY}`);
        res.status(200).json(data.data);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;