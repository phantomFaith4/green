require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('./models/User');
const PORT = 8000;

const authRoute = require('./routes/auth');
const greenhouseRoute = require('./routes/greenhouse');
const userRoute = require('./routes/user');
const weatherRoute = require('./routes/weather');
const notificationRoute = require('./routes/notification');


const app = express();
app.use(express.json());

mongoose
.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.hvjd3.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
})
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));


//-------------------------------------------------------------------------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
      },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({ storage: storage });
  
  app.post("/api/uploadPhoto/:id",upload.single("file"), async (req, res) => {
    const userId = req.params.id;
    const obj = {
        img: {
            data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
             contentType: "image/png"
        }
      };
      const updateImg = await User.findByIdAndUpdate(userId,{
          image:obj.img,
      })
      res.status(200).json("image uploaded")
  });
//-------------------------------------------------------------------------------------  

app.use('/api/auth',authRoute);
app.use('/api/greenhouse',greenhouseRoute); 
app.use('/api/user/',userRoute);
app.use('/api/weather',weatherRoute);
app.use('/api/notification',notificationRoute);

 
app.listen(PORT,()=>{
    console.log("Server is active at port ",PORT);
})