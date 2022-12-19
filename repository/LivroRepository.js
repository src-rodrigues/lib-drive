const createConnection = require('../infra/database/connection');
const execSqlStatement = require('../infra/database/execSqlStatement');

module.exports = {
  async obterTodos() {
    const DQL_command = 'SELECT * FROM vartechs15.livro';
    return await execSqlStatement(DQL_command);
  },

  async obterPorId(id) {
    const DQL_command = 'SELECT * FROM vartechs15.livro WHERE id = ?';
    return await execSqlStatement(DQL_command, [id]);
  },

  async criar({ autor_primario_id, titulo, edicao, ISBN, descricao_fisica }) {
    let connection;
    try {
      connection = await createConnection();
      await connection.beginTransaction();

      const result = await execSqlStatement(
        'INSERT INTO vartechs15.livro (autor_primario_id, titulo, edicao, ISBN, descricao_fisica) VALUES (?, ?, ?, ?, ?)',
        [autor_primario_id, titulo, edicao, ISBN, descricao_fisica],
        connection
      );

      await execSqlStatement(
        `INSERT INTO vartechs15.livro_autor (autor_id, livro_id) VALUES (?, ?)`,
        [autor_primario_id, Number(result.insertId)],
        connection
      );

      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.commit();
      await connection.end();
    }
  },

  async atualizar(
    id,
    {
      autor_primario_id,
      titulo,
      edicao,
      ISBN,
      descricao_fisica,
      autor_primario_id_anterior
    }
  ) {
    let connection;
    try {
      connection = await createConnection();
      await connection.beginTransaction();
      const DML_command_livro_autor = `
        UPDATE
          vartechs15.livro_autor
        SET
          autor_id = ?
        WHERE 
          livro_id = ? AND autor_id = ?;
        `;

      const DML_command_livro = `
        UPDATE
          vartechs15.livro
        SET
          autor_primario_id = ?,
          titulo = ?,
          edicao = ?,
          ISBN = ?,
          descricao_fisica = ?
        WHERE id = ?;
        `;

      if (autor_primario_id_anterior) {
        await Promise.all([
          await execSqlStatement(
            DML_command_livro_autor,
            [autor_primario_id, id, autor_primario_id_anterior],
            connection
          ),
          await execSqlStatement(
            DML_command_livro,
            [autor_primario_id, titulo, edicao, ISBN, descricao_fisica, id],
            connection
          )
        ]);
      } else {
        await execSqlStatement(
          DML_command_livro,
          [autor_primario_id, titulo, edicao, ISBN, descricao_fisica, id],
          connection
        );
      }
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.commit();
      await connection.end();
    }
  },

  async deletar(id) {
    let connection;
    try {
      connection = await createConnection();
      await connection.beginTransaction();

      const DML_command_livro_autor =
        'DELETE FROM vartechs15.livro_autor WHERE livro_id = ?';
      const DML_command_livro = 'DELETE FROM vartechs15.livro WHERE id = ?';

      const result_livro_autor = await execSqlStatement(
        DML_command_livro_autor,
        [id],
        connection
      );
      const result_livro = await execSqlStatement(
        DML_command_livro,
        [id],
        connection
      );
      const data = { result_livro_autor, result_livro };

      return data;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.commit();
      await connection.end();
    }
  },

  async obterPorAutorId(autor_id) {
    const DQL_command = 'SELECT * FROM livro WHERE autor_id = ?';
    return await execSqlStatement(DQL_command, [autor_id]);
  }
};
