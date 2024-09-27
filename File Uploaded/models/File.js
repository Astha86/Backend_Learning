const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    imageUrl:{
        type:String,
    },

    tags:{
        type:String,
    },

    email:{
        type:String,
    }
});

// post middlewarefile
fileSchema.post("save", async function (doc){
    try{
        console.log("DOC: ",doc);

        // transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        // send email
        let info = await transporter.sendMail({
            from:`Sahani`,
            to: doc.email,
            subject:"New file uploaded on cloudinary",
            html:`<h2>Hey!!</h2><p>File Uploaded View here: <a href="${doc,imageUrl}"${doc.imageUrl}</a></p>`.
            
            , 
        }) 
    }

    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something Wrong',
        });
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;