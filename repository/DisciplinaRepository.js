const execSqlStatement = require('../infra/database/execSqlStatement');

module.exports = {
  async obterTodas() {
    const DQL_command = 'SELECT * FROM vartechs15.disciplina';
    return await execSqlStatement(DQL_command);
  },

  async obterPorId(id) {
    const DQL_command = 'SELECT * FROM vartechs15.disciplina WHERE id = ?';
    return await execSqlStatement(DQL_command, [id]);
  },

  async criar({ nome }) {
    const DML_command = 'INSERT INTO vartechs15.disciplina (nome) VALUES (?)';
    return await execSqlStatement(DML_command, [nome]);
  },

  async atualizar(id, { nome }) {
    const DML_command =
      'UPDATE vartechs15.disciplina SET nome = ? WHERE id = ?';
    return await execSqlStatement(DML_command, [nome, id]);
  },

  async deletar(id) {
    const DML_command = 'DELETE FROM vartechs15.disciplina WHERE id = ?';
    return await execSqlStatement(DML_command, [id]);
  }
};
