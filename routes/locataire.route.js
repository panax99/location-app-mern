const express = require('express');
const { addNewLocataire, getAll, getOne, deleteOne, updateOne } = require('../controllers/locataire.controller');
const router = express.Router();

//methods
router.get('/',getAll);
router.get('/:id',getOne);
router.post('/add',addNewLocataire);
router.delete('/delete/:id',deleteOne);
router.put('/update/:id',updateOne);


module.exports = router;