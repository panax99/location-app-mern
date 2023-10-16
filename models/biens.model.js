const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BienSchema = new Schema({
    type : {
        type: String,
        required: true
    },
    loyer : {
        type: String,
        required: true
    },
    surface : {
        type: String,
        required: true
    },
    adresse : {
        type: String,
        required: true
    },
    proprietaire: { 
        type: Schema.Types.ObjectId, 
        ref: 'Proprietaire'
    }
});

const Bien = mongoose.model("Bien",BienSchema);
module.exports = Bien;
