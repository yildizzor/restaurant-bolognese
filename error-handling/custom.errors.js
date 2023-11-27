class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class IsNotAdmin extends CustomError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

module.exports = { CustomError, IsNotAdmin };
