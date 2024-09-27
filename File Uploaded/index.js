// app instantiate
const express = require("express");
const app = express();

// Finding PORT
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Adding middleware 
app.use(express.json());
// (Simple express middleware for uploading files)
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// connecting with DB
const db = require("./config/database")
db.connect();

// connecting with Cloudinary
const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect();                            

// mounting API Route
const Uplaod = require("./routes/FileUpload");
app.use("api/v1/upload",Uplaod);

// activate server
app.listen(PORT,() => {
    console.log(`App is running at ${PORT}`);
})



