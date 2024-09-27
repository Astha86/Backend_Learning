const jwt = require("jsonwebtoken");
require("dotenv").config();

// authentication
exports.auth = () => {
    try{
        // extract JWT Token
        // Pending : other ways to fetch token 
        console.log("cookie", req.cookies.token);
        console.log("body", req.body.token); //less secure
        // console.log("header", req.header("Authorization")); // most secure

        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        if(!token || token === undefined){
            return res.status(401).json({
                success:false,
                message:'Token Misssing',
            })
        }

        // verify the token 
        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);
            // to get the payload
            req.user = payload;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:'Token Invalid',
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong while veryfying the token',
        });
    }
}

// authorization
exports.isStudent = (req,res,next) => {
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:'This is protected route for the students role'
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role is not matching'
        })
    }
}

// authorization
exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:'This is protected route for the admin role'
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role is not matching'
        })
    }
}