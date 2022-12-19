const app = require('express')();
const { exec } = require('child_process');

const printError = require('./infra/database/printError');
const createConnection = require('./infra/database/connection');
const initTables = require('./infra/database/init_tables');
const routes = require('./routes');

app.use('/api', routes);

function startServer() {
  const port = process.env.NODEJS_PORT ? process.env.NODEJS_PORT : 4000;
  app.listen(port, _ => {
    //console.clear();
    console.log(`Server started on port ${port}`);
  });
}

let connection;
(async () => {
  try {
    connection = await createConnection();
    const data = await connection.query('USE vartechs15;');

    console.log(connection.threadId);
    console.log(`Database version: ${connection.serverVersion()}`);
    exec('node -v', (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`node version: ${stdout}`);
      console.log('Github: @src-rodrigues');
    });
    //execute init tables
    //await initTables(connection);

    startServer();
  } catch (error) {
    printError(error, 'prepareDatabase()');
  } finally {
    try {
      await connection.end();
      console.log('Connection closed!');
    } catch (error) {
      printError(error, 'closeConnection()');
    }
  }
})();
