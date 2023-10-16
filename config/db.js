const mongoose = require('mongoose')

const connectDB = (uri) => mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to mongoDB");
}).catch((err) => {
    console.error(err.message);
})

module.exports = connectDB;