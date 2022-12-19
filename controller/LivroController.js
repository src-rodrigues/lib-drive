const printError = require('../infra/database/printError');
const LivroRepository = require('../repository/LivroRepository');
const AbstractError = require('./httpStatusObjects/AbstractError');
const NoContent = require('./httpStatusObjects/NoContent');
const NotFound = require('./httpStatusObjects/NotFound');

class LivroController {
  constructor() {}

  static async getLivros(_, res) {
    try {
      const data = await LivroRepository.obterTodos();
      return res.send(data);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async getLivroById(req, res) {
    const { id } = req.params;
    try {
      const data = await LivroRepository.obterPorId(id);

      //remover validação da controller
      if (!Array.isArray(data) || !data.length)
        throw new NotFound('Livro não encontrado!');

      return res.send(data);
    } catch (error) {
      if (error instanceof AbstractError)
        return res.status(error.getStatusCode()).send(error);
      return res.status(500).send(error);
    }
  }

  static async createLivro(req, res) {
    const { body } = req;
    try {
      const data = await LivroRepository.criar(body);
      body.id = Number(data.insertId);
      return res.status(201).send(body);
    } catch (error) {
      printError(error, 'LivroController.createLivro');
      if (error.code === 'ER_DUP_ENTRY') {
        const entryValue = error.text.match(/'([^']+)'/)[1];
        let key = error.text.match(/key '([^']+)'/)[1];
        key = key.match(/(.+)_/)[1];

        return res.status(409).send({
          errno: error.errno,
          code: error.code,
          text: `O valor ${entryValue} para o campo ${key} já existe!`
        });
      }
      return res.status(500).send(error);
    }
  }

  static async updateLivro(req, res) {
    const { id } = req.params;
    const { body } = req;

    try {
      const livro = await LivroRepository.obterPorId(id);
      if (!Array.isArray(livro) || !livro.length)
        throw new NotFound('Livro não encontrado!');

      const livroAtualizado = { ...livro[0], ...body };

      livroAtualizado.id = id;
      if (
        body.autor_primario_id &&
        body.autor_primario_id !== livro[0].autor_primario_id
      ) {
        livroAtualizado.autor_primario_id_anterior = livro[0].autor_primario_id;
        await LivroRepository.atualizar(id, livroAtualizado);
        delete livroAtualizado.autor_primario_id_anterior;
      } else await LivroRepository.atualizar(id, livroAtualizado);

      return res.send(livroAtualizado);
    } catch (error) {
      if (error instanceof AbstractError)
        return res.status(error.getStatusCode()).send(error);
      return res.status(500).send(error);
    }
  }

  static async deleteLivro(req, res) {
    const { id } = req.params;

    try {
      const { result_livro } = await LivroRepository.deletar(id);
      if (!result_livro.affectedRows)
        throw new NotFound('Livro não encontrado!');

      return res.status(new NoContent().getStatusCode()).end();
    } catch (error) {
      if (error instanceof AbstractError)
        return res.status(error.getStatusCode()).send(error);
      return res.status(500).send(error);
    }
  }

  static async getLivrosByAutorId(req, res) {
    const { id } = req.params;

    try {
      const data = await LivroRepository.obterPorAutorId(id);

      if (!Array.isArray(data) || !data.length)
        throw new NotFound('Livros não encontrados!');
      return res.send(data);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async getLivrosByDisciplinaId(req, res) {
    const { id } = req.params;

    try {
      const data = await LivroRepository.obterPorDisciplinaId(id);
      return res.send(data);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async getLivrosByAutorIdAndDisciplinaId(req, res) {
    const { autorId, disciplinaId } = req.params;

    try {
      const data = await LivroRepository.obterPorAutorIdAndDisciplinaId(
        autorId,
        disciplinaId
      );
      return res.send(data);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async getLivrosByAutorIdAndDisciplinaIdAndNome(req, res) {
    const { autorId, disciplinaId, nome } = req.params;

    try {
      const data = await LivroRepository.obterPorAutorIdAndDisciplinaIdAndNome(
        autorId,
        disciplinaId,
        nome
      );
      return res.send(data);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async getLivrosByAutorIdAndNome(req, res) {
    const { autorId, nome } = req.params;

    try {
      const data = await LivroRepository.obterPorAutorIdAndNome(autorId, nome);
      return res.send(data);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async getLivrosByDisciplinaIdAndNome(req, res) {
    const { disciplinaId, nome } = req.params;

    try {
      const data = await LivroRepository.obterPorDisciplinaIdAndNome(
        disciplinaId,
        nome
      );
      return res.send(data);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

module.exports = LivroController;
