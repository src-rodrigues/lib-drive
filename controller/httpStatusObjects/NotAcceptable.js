const AbstractError = require('./AbstractError');

class NotAcceptable extends AbstractError {
  constructor(text = 'NotAcceptable') {
    super(text, 406);
  }
}

module.exports = NotAcceptable;
