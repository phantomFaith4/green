const router = require('express').Router();
require('dotenv').config();

router.get('/:city', async(req,res)=>{
    try{
        const city = req.params.city;
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${process.env.OPEN_WEATHER_KEY}`);
        res.status(200).json(res);
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;