const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LocataireSchema = new Schema({
    lastname : {
        type: String,
        required: true
    },
    firstname : {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    telephone : {
        type: String,
        required: true,
        unique: true
    },
    bien: { 
        type: Schema.Types.ObjectId, 
        ref: 'Bien'
    }
});

const Locataire = mongoose.model("Locataire",LocataireSchema);
module.exports = Locataire;
