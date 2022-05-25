const express = require('express');
const PORT = 8000;
const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send(`Hello world from PORT ${PORT}`);
})

app.listen(PORT,()=>{
    console.log("Server is active at port ",PORT);
})