const AutorRepository = require('../repository/AutorRepository');
const AbstractError = require('./httpStatusObjects/AbstractError');
const NotFound = require('./httpStatusObjects/NotFound');

class AutorController {
  constructor() {}

  static async getAutores(_, res) {
    try {
      const data = await AutorRepository.obterTodos();
      return res.send(data);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async getAutorById(req, res) {
    const { id } = req.params;
    try {
      const data = await AutorRepository.obterPorId(id);

      //remover validação da controller
      if (!Array.isArray(data) || !data.length)
        throw new NotFound('Autor não encontrado!');

      return res.send(data);
    } catch (error) {
      if (error instanceof AbstractError)
        return res.status(error.getStatusCode()).send(error);
      return res.status(500).send(error);
    }
  }

  static async createAutor(req, res) {
    const { body } = req;
    try {
      const data = await AutorRepository.criar(body);
      body.id = Number(data.insertId);
      return res.status(201).send(body);
    } catch (error) {
      /*
      //não existe mais a necessidade de validar o erro, pois o banco permite um autor com o mesmo nome
      if (error.code === 'ER_DUP_ENTRY')
        return res.status(409).send({
          errno: error.errno,
          code: error.code,
          text: 'Autor já existe!'
        });
      */
      console.log(error);
      return res.status(500).send(error);
    }
  }

  static async updateAutor(req, res) {
    const { id } = req.params;
    const { body } = req;

    try {
      const autor = await AutorRepository.obterPorId(id);
      if (!Array.isArray(autor) || !autor.length)
        throw new NotFound('Autor não encontrado!');

      const novoAutor = { ...autor[0], ...body };
      await AutorRepository.atualizar(id, novoAutor);

      res.send(novoAutor);
    } catch (error) {
      if (error instanceof AbstractError)
        return res.status(error.getStatusCode()).send(error);

      if (error.code === 'ER_DUP_ENTRY')
        return res.status(409).send({
          errno: error.errno,
          code: error.code,
          text: 'Autor já existe!'
        });

      return res.status(500).send(error);
    }
  }

  static async deleteAutor(req, res) {
    const { id } = req.params;
    try {
      const data = await AutorRepository.deletar(id);
      if (data.affectedRows === 0) throw new NotFound('Autor não encontrado!');

      return res.status(204).send();
    } catch (error) {
      if (error instanceof AbstractError)
        return res.status(error.getStatusCode()).send(error);
      return res.status(500).send(error);
    }
  }
}

module.exports = AutorController;
