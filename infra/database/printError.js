module.exports = (err, fnName) => {
  console.log('<----------------------------------------');
  delete err.stack;
  console.log(fnName);
  console.error(err);
  console.log('---------------------------------------->');
};
