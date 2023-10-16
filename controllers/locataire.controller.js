const Locataire = require('../models/locataire.model');

module.exports.addNewLocataire = async (req, res) => {
    const { lastname, firstname, address, email, telephone, bien } = req.body;
    try {
        const existingUser = await Locataire.findOne({email}); 
        if (existingUser) {
            return res.json({ message: "Le locataire existe déjà!" });
        }
        const locataire = new Locataire({ lastname, firstname, address, email, telephone, bien });
        await locataire.save()
            .then(() => {
                res.json({ message: "Nouveau locataire ajouté avec succès" });
            })
            .catch((err) => {
                res.json({ message: "Erreur lors de l'ajout!" + err });
            });

    } catch (err) {
        console.log(err);
    }
}

module.exports.getAll = async(req,res) => {
    try {
        const locataire = await Locataire.find();
        res.json(locataire);
    }
    catch (err) {
        res.json({ message: "Aucun locataire." });
    }
}

module.exports.getOne = async (req,res) => {
    const id = req.params.id;
    try {
        const user = await Locataire.findOne({_id: id});
        res.json(user);
    } catch (err) {
        res.json({ message: "Aucun locataire." });
    }
}

module.exports.deleteOne = async (req,res) => {
    const id = req.params.id;
    try {
        await Locataire.remove({_id: id});
        res.json({ message: "Supprimé avec succès" });
    } catch (err) {
        res.json({ message: "Aucun locataire." });
    }
}

module.exports.updateOne = async (req,res) => {
    const { lastname, firstname, address, email, telephone, bien } = req.body;
    const id = req.params.id;

    const data = { lastname, firstname, address, email, telephone, bien };

    try {
        await Locataire.findByIdAndUpdate(id,{ $set: data });
        res.json({ message: "Modifié avec succès!" });
    } catch (err) {
        res.json({ message: "Erreur lors de la modification!"+ err });
    }
}