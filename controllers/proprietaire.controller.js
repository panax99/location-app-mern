const Proprietaire = require('../models/proprietaire.model');
const bcrypt = require('bcrypt');
const { createAccessToken,createRefreshToken } = require('../utils/generateToken');
const Bien = require('../models/biens.model');
const Locataire = require('../models/locataire.model');

/* AUTH */
module.exports.signUp = async (req, res) => {
    const { lastname, firstname, email, password } = req.body;

    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPwd = await bcrypt.hash(password, salt);

        if (!lastname || !firstname || !email || !password) {
            return res.status(401).json({ message: "Veuillez renseigner touts les champs!" });
        }
        if (password.length < 5) {
            return res.status(401).json({ message: "Le mot de passe doit contenir au moins 6 caractères" });
        }
        const existingUser = await Proprietaire.findOne({email}); 
        if (existingUser) {
            return res.status(401).json({ message: "L'utilisateur existe déjà!" });
        }
        const proprietaire = new Proprietaire({
            lastname: lastname,
            firstname: firstname,
            email: email,
            password: hashedPwd
        });
        await proprietaire.save()
            .then(() => {
                res.status(201).json({ message: "Votre compte a été crée avec succès" });
            })
            .catch((err) => {
                res.status(500).json({ message: "Erreur" + err });
            });

    } catch (err) {
        console.log(err);
    }

}

module.exports.signinUser = async(req,res) => {
    const { email,password } = req.body;

    const existUser = await Proprietaire.findOne({email});

    if (existUser) {
        const passwordInDB = existUser.password;
        const matchPassword = await bcrypt.compare(password, passwordInDB);
        if (matchPassword) {
            const accessToken = createAccessToken({email: email});
            const refreshToken = createRefreshToken({email: email});
            res.status(201).json({message: "Connecté avec succès!", accessToken: accessToken,token: refreshToken});
        } else {
            res.status(401).json({message: "Le mot de passe est incorrect!"}); 
        }
    } else {
        res.status(500).json({message: "Cet utilisateur n'existe pas."});
    }
}

/* */

/* BIENS */
module.exports.addNewBien = async(req,res) => {
    try{
        const proprietaireId = req.params.id;
        const { type,loyer,surface,adresse } = req.body;
        const user = await Proprietaire.findById(proprietaireId);
    
        if(!user) {
            res.json({message: "Propriétaire n'existe pas"});
        }
        const newBien = new Bien({ type:type,loyer:loyer,surface:surface,adresse:adresse, proprietaire: proprietaireId});
        const bienAjoute = await newBien.save()
            .then(
                res.json({message: "ajouté nouveau bien!"})
            )
            .catch((err) => {
                res.json({message: "Erreur ajout bien"+err})
            })  
        if (bienAjoute) {
            user.biens.push(newBien);
            await user.save();
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.updateBien = async(req,res) => {
    try{
        const proprietaireId = req.params.id;
        const bienId = req.params.id_bien;
        const { type,loyer,surface,adresse } = req.body;
        const user = await Proprietaire.findById(proprietaireId);
        const data = {type,loyer,surface,adresse, proprietaire: proprietaireId};
    
        if(!user) {
            res.status(401).json({message: "Propriétaire n'existe pas"});
        }
        await Bien.findByIdAndUpdate(bienId,{$set: data});
        res.status(201).json({message: "Modifié avec succès"});

    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.deleteBien = async(req,res) => {
    try{
        const proprietaireId = req.params.id;
        const bienId = req.params.id_bien;
        const user = await Proprietaire.findById(proprietaireId);
    
        if(!user) {
            res.status(401).json({message: "Propriétaire n'existe pas"});
        }
        await Bien.findByIdAndRemove({_id: bienId});
        res.status(201).json({message: "Supprimé avec succès"});

    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports.getBien = async(req,res) => {
    try {
        const proprietaireId = req.params.id;
        const user = await Proprietaire.findById(proprietaireId);
        if(!user) {
            res.status(401).json({message: "Propriétaire n'existe pas"});
        }
        const biens = await Bien.find({proprietaire: proprietaireId});
        biens ? res.json(biens) : res.json({message: "Aucun bien."});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
/* */

/* LOCATAIRES */
module.exports.getLocataire = async(req,res) => {
    try {
        const proprietaireId = req.params.id;
        const user = await Proprietaire.findById(proprietaireId);
        if(!user) {
            res.status(401).json({message: "Propriétaire n'existe pas"});
        }
        const bienUser = await Bien.find({proprietaire: proprietaireId});
        const locataires = await Locataire.find({bien: bienUser});
        locataires.length > 0 ? res.json(locataires) : res.json({message: "Aucun locataire."});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.updateLocataire = async(req,res) => {
    try{
        const proprietaireId = req.params.id;
        const locataireId = req.params.id_locataire;
        const { lastname, firstname, address, email, telephone, bien } = req.body;
        const user = await Proprietaire.findById(proprietaireId);
        const data = {lastname, firstname, address, email, telephone, bien};
    
        if(!user) {
            res.status(401).json({message: "Propriétaire n'existe pas"});
        }
        await Bien.findByIdAndUpdate(locataireId,{$set: data});
        res.status(201).json({message: "Modifié avec succès"});

    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.deleteLocataire = async(req,res) => {
    try{
        const proprietaireId = req.params.id;
        const locataireId = req.params.id_locataire
        const user = await Proprietaire.findById(proprietaireId);
    
        if(!user) {
            res.status(401).json({message: "Propriétaire n'existe pas"});
        }

        await Locataire.findByIdAndRemove({_id: locataireId});
        res.status(201).json({message: "Supprimé avec succès"});

    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.addNewLocataire = async(req,res) => {
    try{
        const proprietaireId = req.params.id;
        const bienId = req.params.id_bien;
        
        const { lastname,firstname,email,address,telephone } = req.body;
        const user = await Proprietaire.findById(proprietaireId);
        const bien = await Bien.findById(bienId);
    
        if(!user) {
            res.status(405).json({message: "Propriétaire n'existe pas"});
        }
        if(!bien) {
            res.status(405).json({message: "Bien n'existe pas"});
        }
        const newLocataire = new Locataire({ lastname,firstname,email,address,telephone,bien: bienId});
        const locAdded = await newLocataire.save();
        
        if (locAdded) {
            user.locataires.push(newLocataire);
            await user.save();
            res.json({ message: "Locataire ajouté avec succès!" });
        } else {
            res.json({ message: "pas ajouté!" });
        }
        
    } catch (err) {
        res.status(500).json({ error: 'Internal server error'+err });
    }
}

/* */

/* METHODS  */
module.exports.getAll = async(req,res) => {
    const users = await Proprietaire.find();
    try {
        users ? res.json(users) : res.json({ message: "Aucun utilisateur inscrit." });
    } catch (err) {
        res.json({message : "Erreur interne serveur!"+err});
    }
}

module.exports.getOneUser = async(req,res) => {
    const id = req.params.id;
    const user = await Proprietaire.findOne({_id: id});

    try {
        user ? res.json(user) : res.json({ message: "Aucun utilisateur avec cet identifiant." });
    } catch (error) {
        res.json({message : "Erreur interne serveur!"+error});
    }
}