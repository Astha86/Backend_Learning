// creating instance of express (server instantiate)
const  express = require ('express');
const app = express();

const bodyParser = require('body-parser');

// Specifically parse JSON data & add it to the request .Body object
app.use(bodyParser.json());

// Activate the server oon 3000 port
app.listen(3000, () => {
    console.log("Server Started at port no. 3000");
});

// get Request -by creating routes
app.get('/', (request,respond) => {
    respond.send("Hello, Beautiful");
});

// post request -by creating routes
app.post('/api/cars', (request,respond) => {
    const {name, brand} = request.body;
    console.log(name);
    console.log(brand);
    respond.send("Car submitted Successfully");
});

// connection of server with database

const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {console.log("Connection successful")})
.catch((error) => {console.log("Received an error")});