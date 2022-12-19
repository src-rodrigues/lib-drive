const disciplina = require('./DisciplinaRoute');
const autor = require('./AutorRoute');
const livro = require('./LivroRoute');

const router = require('express').Router();
const { json } = require('express');

router.use(json());

router.get('/', (_, res) => {
  res.send({ msg: 'Welcome LibDrive API' });
});

router.use('/disciplina', disciplina);
router.use('/autor', autor);
router.use('/livro', livro);

module.exports = router;
