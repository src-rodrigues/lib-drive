const printError = require('./printError');
const path = require('path');
const fs = require('fs');

get_DDL_Array = fileName => {
  try {
    return fs
      .readFileSync(path.resolve(__dirname, fileName))
      .toString()
      .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
      .replace(/\s+/g, ' ') // excess white space
      .split(';') // split into all statements
      .map(Function.prototype.call, String.prototype.trim)
      .filter(el => el.length != 0)
      .map(sql => sql + ';'); // add back the semicolon
  } catch (error) {
    throw error;
  }
};

//execute all statements with promise all
module.exports = async connection => {
  await connection.beginTransaction();
  try {
    const createDDL_Array = get_DDL_Array('ddl_create.sql');
    //separar em outro promise all as tabelas que não dependem de outra para serem criadas
    await Promise.all(
      createDDL_Array.map(async sql => await connection.execute(sql))
    );
  } catch (error) {
    // throws error if any of the statements fail and execute rollback
    printError(error, 'Error creating tables');

    try {
      const roolbackDDL_Array = get_DDL_Array('ddl_rollback.sql');
      //separar em outro promise all as tabelas que não dependem de outra para serem excluidas
      await Promise.all(
        roolbackDDL_Array.map(async sql => await connection.execute(sql))
      );
    } catch (error) {
      printError(error, 'Rollback error');
    }
  }
  await connection.commit();
};
