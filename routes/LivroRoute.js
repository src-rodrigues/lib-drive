const { Router } = require('express');
const router = Router();
const LivroController = require('../controller/LivroController');

router.get('/', LivroController.getLivros);
router.post('/', LivroController.createLivro);

router.get('/:id', LivroController.getLivroById);
router.put('/:id', LivroController.updateLivro);
router.delete('/:id', LivroController.deleteLivro);

module.exports = router;
