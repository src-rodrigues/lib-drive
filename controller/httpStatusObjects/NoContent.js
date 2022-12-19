const AbstractError = require('./AbstractError');

class NoContent extends AbstractError {
  constructor(text = 'NoContent') {
    super(text, 204);
  }
}

module.exports = NoContent;
