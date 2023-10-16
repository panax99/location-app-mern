const express = require('express');
const { getAll, getOne, deleteOne, updateOne, addNewBien } = require('../controllers/bien.controller');
const router = express.Router();

//methods
router.get('/',getAll);
router.get('/:id',getOne);
router.post('/add',addNewBien);
router.delete('/delete/:id',deleteOne);
router.put('/update/:id',updateOne);

module.exports = router;