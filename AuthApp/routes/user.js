const express = require("express");
const router = express.Router();

const {login, signup} = require("../controllers/Auth");
const {auth, isStudent, isAdmin} = require("../middleware/auth");

router.post("/login",login);
router.post("/signup",signup);

// testing protected routes for single middleware
router.get("/test", auth, (req,res) => {
    res.json({
        successs:true,
        message:'Welcome to the Protected route for test',
    });
})

// Protected Route
router.get("/student", auth, isStudent, (req,res) => {
    res.json({
        successs:true,
        message:'Welcome to the Protected route for students',
    });
});

router.get("/admin", auth, isAdmin, (req,res) => {
    res.json({
        successs:true,
        message:'Welcome to the Protected route for admin',
    });
});

// router.get("/getEmail" ,auth, async(req,res) => {
//     try{
//         const id = req.user.id;
//         const user = await User.findById({id});

//         res.status(200).json({
//             success:true,
//             user:user,
//             message:'Welcome to the Email Route',
//         });
//     }

//     catch(error){
//         res.status(500).json({
//             success:false,
//             error:error,
//             message:'Crashed !!',
//         });
//     }
// });

module.exports = router;