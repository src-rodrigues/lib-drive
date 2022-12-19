const AbstractError = require('./AbstractError');

class BadRequest extends AbstractError {
  constructor(text = 'BadRequest') {
    super(text, 400);
  }
}

module.exports = BadRequest;
