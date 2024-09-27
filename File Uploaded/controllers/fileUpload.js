const File = require("../models/File");
const Cloudinary = require('cloudinary').v2;

// Handler funtion of local file
exports.localFileUpload = async(req,res) => {
    try{
        // fetching the datafrom server
        const file = req.files.file;
        console.log("File  mil gyi !!!!");

        // Server's Path
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path: ",path)

        // client k path se data leke server k path pe le aayega
        file.mv(path ,(err)=> {
            console.log(err);
        });

        res.json({
            success:true,
            message:"local file uploaded succesfully",
        });
    }

    catch(error){
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.include(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await Cloudinary.uploader.upload(file.tempFilePath, options);
}

// image upload handler (on Cloudinary)
exports.imageUpload = async(req,res) => {
    try{

        // data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // if file format is supported 
        const response = await uploadFileToCloudinary(file,"Sahani");


        // Save entry in DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        });

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something Wrong',
        });
    }
}

exports.videoUpload = async(req,res) => {
    try{
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // if file format is supported 
        const response = await uploadFileToCloudinary(file,"Sahani");
           
        // Save entry in DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Video Successfully Uploaded',
        });
    }

    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something Wrong',
        });
    }
}

exports.imageReduceUpload = async (req,res) => {
    try{
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // if file format is supported 
        const response = await uploadFileToCloudinary(file,"Sahani",30);


        // Save entry in DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        });
    }

    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something Wrong',
        });
    }
}