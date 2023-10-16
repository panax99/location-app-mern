const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config({ path: './config/.env' });
const app = express();
const port = process.env.PORT;
const uri = process.env.DB_URL;
const proprioRoute = require('./routes/proprietaire.route');
const locRoute = require('./routes/locataire.route');
const bienRoute = require('./routes/bien.route');
const cors = require('cors');

connectDB(uri);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/api/proprios',proprioRoute);
app.use('/api/loc',locRoute);
app.use('/api/bien',bienRoute);

app.listen(port,() => {
    console.log(`Server listening on ${port}`);
});