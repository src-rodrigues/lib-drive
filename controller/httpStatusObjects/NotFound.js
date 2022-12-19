const AbstractError = require('./AbstractError');

class NotFound extends AbstractError {
  constructor(text = 'NotFound') {
    super(text, 404);
  }
}

module.exports = NotFound;
