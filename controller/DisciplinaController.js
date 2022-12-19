const printError = require('../infra/database/printError');
const DisciplinaRepository = require('../repository/DisciplinaRepository');
const AbstractError = require('./httpStatusObjects/AbstractError');
const NotFound = require('./httpStatusObjects/NotFound');
const NoContent = require('./httpStatusObjects/NoContent');

class DisciplinaController {
  constructor() {}

  static async getDisciplinas(_, res) {
    try {
      const data = await DisciplinaRepository.obterTodas();
      return res.send(data);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  static async getDisciplinaById(req, res) {
    const { id } = req.params;
    try {
      const data = await DisciplinaRepository.obterPorId(id);

      //remover validação da controller
      if (!Array.isArray(data) || !data.length)
        throw new NotFound('Disciplina não encontrada!');

      return res.send(data);
    } catch (error) {
      // veriricar se o erro é do tipo AbstractError
      return res.status(error.getStatusCode()).send(error);
    }
  }

  static async createDisciplina(req, res) {
    const { body } = req;
    try {
      const data = await DisciplinaRepository.criar(body);
      body.id = Number(data.insertId);
      return res.status(201).send(body);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        return res.status(409).send({
          errno: error.errno,
          code: error.code,
          text: 'Disciplina já existe!'
        });

      return res.status(500).send(error);
    }
  }

  static async updateDisciplina(req, res) {
    const { id } = req.params;
    const { body } = req;

    try {
      const data = await DisciplinaRepository.atualizar(id, body);

      if (data.affectedRows === 0)
        throw new NotFound('Disciplina não encontrada!');

      return res.send(body);
    } catch (error) {
      if (error instanceof AbstractError)
        return res.status(error.getStatusCode()).send(error);

      if (error.code === 'ER_DUP_ENTRY')
        return res.status(409).send({
          errno: error.errno,
          code: error.code,
          text: 'Disciplina já existe!'
        });

      return res.status(500).send(error);
    }
  }

  static async deleteDisciplina(req, res) {
    const { id } = req.params;
    try {
      const data = await DisciplinaRepository.deletar(id);

      if (data.affectedRows === 0)
        throw new NotFound('Disciplina não encontrada!');

      return res.status(new NoContent().getStatusCode()).end();
    } catch (error) {
      if (error instanceof AbstractError)
        return res.status(error.getStatusCode()).send(error);

      return res.status(500).send(error); //500
    }
  }
}
module.exports = DisciplinaController;
