class response {
  constructor() {
    this.body = {};
    this.code = 200;
  }
  status(code) {
    this.code = code;
    return this;
  }
  send(stuff) {
    this.body = stuff;
  }
}

module.exports = response;
