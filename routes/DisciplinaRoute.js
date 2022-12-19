const { Router } = require('express');
const router = Router();
const DisciplinaController = require('../controller/DisciplinaController');

router.get('/', DisciplinaController.getDisciplinas);
router.post('/', DisciplinaController.createDisciplina);

router.get('/:id', DisciplinaController.getDisciplinaById);
router.put('/:id', DisciplinaController.updateDisciplina);
router.delete('/:id', DisciplinaController.deleteDisciplina);

//router.use('/livros')
module.exports = router;
