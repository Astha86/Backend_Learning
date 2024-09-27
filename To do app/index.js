const express = require("express");
const app = express();

// load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// midleware to parse json request body 
app.use(express.json());

// import routes for Todo API
const todoRoutes = require("./routes/todos");

// mount(append) the todo API routes 
app.use("/api/v1", todoRoutes);

// start server 
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})

// connection to db
const dbConnect = require("./config/database");
dbConnect();

// default route

app.get("/", (req,res) => {
    res.send(`<h1> This is home page </h1>`);
})