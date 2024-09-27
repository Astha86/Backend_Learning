// import mongoose 
const mongoose = require("mongoose");

// route Handler / schema
const likeSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // reference to the post model
    },

    user:{
        type: String,
        required:true,
    },
});

// export
module.exports = mongoose.model("Like",likeSchema);