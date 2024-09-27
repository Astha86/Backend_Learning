const mongoose = require("mongoose");

require("dotenv").config();

// Building connection through this function
const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then( () => {console.log("Successfull Connection")})
    .catch( (error) => {
        console.log("Unsuccessfull Connection");
        console.error(error.message);
        process.exit(1);
    });
}

module.exports = dbConnect;