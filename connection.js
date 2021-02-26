const mongoose = require('mongoose');

// checks for any connection error to the database

mongoose.connect('mongodb://localhost/test', { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true,
    //connectTimeoutMS : 1000, // specifies the time for reconnection
    //reconnectTries:1, // specifies the number of times we want to try and reconnect
})
 .then(() => console.log('Connected to Mongodb...'))
 .catch((err) => console.log(err.message)); // this execxutes after a certain time because mongodb tries to reconnect

mongoose.connection.on('error', function(err) {
    console.log("Could not connect to mongo server..."); // if there is an error in connecting to the database
    process.exit(1); //exit the process 
});
mongoose.connection.on('disconnected', (err)=> { //if the database has been completely disconnected 
    console.log("Mongodb shut down..");
    process.exit(1);
});

module.exports.mongoose = mongoose;