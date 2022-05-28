require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = 8000;

const authRoute = require('./routes/auth');
const greenhouseRoute = require('./routes/greenhouse');
const userRoute = require('./routes/user');
const weatherRoute = require('./routes/weather');

const app = express();
app.use(express.json());

mongoose
.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.hvjd3.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
})
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));


app.use('/api/auth',authRoute);
app.use('/api/greenhouse',greenhouseRoute); 
app.use('/api/user/',userRoute);
app.use('/api/weather',weatherRoute);


app.listen(PORT,()=>{
    console.log("Server is active at port ",PORT);
})