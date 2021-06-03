const HANDLE_ERRORS = {
  CastError: (res, { message }) =>
    res.status(400).send({ error: message }).end(),

  MongoError: (res, { message }) => res.status(400).send({ error: message }),

  ValidationError: (res, { message }) =>
    res.status(400).send({ error: message }),

  JsonWebTokenError: (res) => res.status(401).json({ error: "invalid token" }),

  TokenExpiredError: (res, { message }) =>
    res.status(400).send({ error: message }),

  SyntaxError: (res, { message }) => res.status(400).send({ error: message }),

  DefaultError: (res) => res.status(500).end(),
}

module.exports = (error, request, response, next) => {
  console.error(error.name, error.message)
  const handler = HANDLE_ERRORS[error.name] || HANDLE_ERRORS.DefaultError

  handler(response, error)
}
