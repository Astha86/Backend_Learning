// import mongoose 
const mongoose = require("mongoose");

// route Handler / schema
const commentSchema = new mongoose.Schema({

    // konsi si post pe comment ho rha h
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // reference to the post model
    },

    // kon kr rha h
    user:{
        type: String,
        required:true,
    },

    // ky comment kr rha h
    body:{
        type: String,
        required:true,
    }
});

// export
module.exports = mongoose.model("Comment",commentSchema);