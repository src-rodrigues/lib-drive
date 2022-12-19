const { Router } = require('express');
const router = Router();
const AutorController = require('../controller/AutorController');

router.get('/', AutorController.getAutores);
router.post('/', AutorController.createAutor);

router.get('/:id', AutorController.getAutorById);
router.put('/:id', AutorController.updateAutor);
router.delete('/:id', AutorController.deleteAutor);

module.exports = router;
