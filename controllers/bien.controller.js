const Bien = require('../models/biens.model');

module.exports.addNewBien = async (req, res) => {
    const { type, loyer, surface, adresse } = req.body;
    try {
        const bien = new Bien({ type, loyer, surface, adresse });
        await bien.save()
            .then(() => {
                res.json({ message: "Nouveau bien ajouté avec succès" });
            })
            .catch((err) => {
                res.json({ message: "Erreur lors de l'ajout! " + err });
            });

    } catch (err) {
        console.log(err);
    }
}

module.exports.getAll = async(req,res) => {
    try {
        const biens = await Bien.find();
        res.json(biens);
    } catch (err) {
        res.json({ message: "Aucun Bien." });
    }
}

module.exports.getOne = async(req,res) => {
    const id = req.params.id;
    try {
        const bien = await Bien.findOne({_id: id});
        res.json(bien);
    } catch (err) {
        res.json({ message: "Aucun Bien." });
    }
}

module.exports.deleteOne = async(req,res) => {
    const id = req.params.id;
    try {
        await Bien.remove({_id: id});
        res.json({ message: "Supprimé avec succès" })
    } catch (err) {
        res.json({ message: "Aucun Bien." });
    }
}

module.exports.updateOne = async(req,res) => {
    const { type, loyer, surface, adresse } = req.body;
    const id = req.params.id;

    const data = { type, loyer, surface, adresse }

    try {
        await Bien.findByIdAndUpdate(id,{ $set: data });
        res.json({ message: "Modifié avec succès!" });
    } catch (err) {
        res.json({ message: "Erreur lors de la modification!"+ err });
    }
}