const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProprietaireSchema = new Schema({
    lastname : {
        type: String,
        required: true
    },
    firstname : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
        unique: true
    },
    biens: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Bien' 
    }],
    locataires: [{
        type: Schema.Types.ObjectId,
        ref: 'Locataire'
    }]
})

const Proprietaire = mongoose.model("Proprietaire",ProprietaireSchema);
module.exports = Proprietaire;
