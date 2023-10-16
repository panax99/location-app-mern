const express = require('express');
const { signUp, signinUser, getAll, getOneUser, addNewBien, addNewLocataire, deleteBien, updateBien, deleteLocataire, updateLocataire } = require('../controllers/proprietaire.controller');
const router = express.Router();


router.get('/',getAll);
router.get('/:id',getOneUser);
router.post('/login',signinUser);
router.post('/register',signUp);

//add bien
router.post('/:id/bien',addNewBien);
router.delete('/:id/bien/:id_bien',deleteBien);
router.put('/:id/bien/:id_bien',updateBien);

//add locataire
router.post('/:id/loc/bien/:id_bien',addNewLocataire);
router.delete('/:id/loc/:id_locataire',deleteLocataire);
router.put('/:id/loc/:id_locataire',updateLocataire);

module.exports = router;