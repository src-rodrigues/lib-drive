const createConnection = require('./connection');
const printError = require('./printError');

module.exports = async (statement, parameters = '', externConnection) => {
  let connection;
  try {
    connection = externConnection ? externConnection : await createConnection();
    return await connection.query(statement, parameters);
  } catch (error) {
    throw error;
  } finally {
    try {
      if (!externConnection) {
        await connection.end();
        console.log('Connection closed...');
      }
    } catch (error) {
      throw error;
    }
  }
};
