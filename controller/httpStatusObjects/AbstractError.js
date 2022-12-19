class AbstractError extends Error {
  constructor(text, statusCode) {
    super(text);
    this.text = text;
    this.getStatusCode = _ => {
      return statusCode;
    };
  }
}

module.exports = AbstractError;
