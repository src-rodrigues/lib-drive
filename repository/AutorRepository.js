const execSqlStatement = require('../infra/database/execSqlStatement');

module.exports = {
  async obterTodos() {
    const DQL_command = 'SELECT * FROM vartechs15.autor';
    return await execSqlStatement(DQL_command);
  },

  async obterPorId(id) {
    const DQL_command = 'SELECT * FROM vartechs15.autor WHERE id = ?';
    return await execSqlStatement(DQL_command, [id]);
  },

  async criar({ nome_completo, nome_abnt }) {
    const DML_command = `INSERT INTO vartechs15.autor (nome_completo, nome_abnt) VALUES (?, ?)`;
    return await execSqlStatement(DML_command, [nome_completo, nome_abnt]);
  },

  async atualizar(id, { nome_completo, nome_abnt }) {
    const DML_command = `UPDATE vartechs15.autor SET nome_completo = ?, nome_abnt = ? WHERE id = ?`;
    return await execSqlStatement(DML_command, [nome_completo, nome_abnt, id]);
  },

  async deletar(id) {
    const DML_command = 'DELETE FROM vartechs15.autor WHERE id = ?';
    return await execSqlStatement(DML_command, [id]);
  }
};
