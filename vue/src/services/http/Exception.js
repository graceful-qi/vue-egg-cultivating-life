class Exception {
  constructor(name, message, payload) {
    Object.assign(this, {
      name,
      message,
      payload
    })
  }
}

export class NetworkException extends Exception {
  constructor(message, payload) {
    super('NetworkException', message, payload)
  }
}

export class ResponseException extends Exception {
  constructor(message, payload) {
    super('ResponseException', message, payload)
  }
}
