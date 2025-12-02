const mongoose = require('mongoose');

const configParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: process.env.DB_SSL==true && process.env.NODE_ENV === 'production',
    sslValidate: process.env.DB_SSL==true && process.env.NODE_ENV === 'production',
}

mongoose.connect(process.env.MONGO_URI, configParams);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Mongo DB Connected successfully");
});






