//  import models
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

// like a post
exports.likePost = async(req,res) => {
    try{
        const {post, user} = req.body;
        const like = new Like({
            post, user,
        });
        
        const savedLike = await like.save();

        // update the post collection basis on this
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new:true})
                            .populate("likes").exec();
        res.json({
            post:updatedPost,
        });
    }

    catch(error){
        return res.status(400).json({
            error: "Error while liking post",
        });
    }
}

// Unlike a post
exports.unlikePost = async(req,res) => {
    try{
        const {post,like} = req.body;

        // find and delete the like collection me se
        const deleteLike = await Like.findOneAndDelete({post:post, _id:like});

        // update the post collection basis on this
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deleteLike._id}}, {new:true});
                            // .populate("likes").exec();
        
        res.json({
            post:updatedPost,
        });
    }

    catch(error){
        return res.status(400).json({
            error: "Error while unliking post",
        });
    }
}


exports.dummyLink = (req,res) => {
    res.send("Home page");
};