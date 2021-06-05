'use strict'

const httpStatus = require('http-status')
const { ValidationError } = require('express-validation');

// handle not found error
exports.handleNotFound = (_req, res, _next) => {
  res.status(httpStatus.NOT_FOUND)
  res.json({
    error: 'Not found'
  })
  res.end()
}

// handle errors
exports.handleError = (err, _req, res, _next) => {
  console.error(`Error occurred`, err)

  if (err instanceof ValidationError) {
    return res.status(httpStatus.BAD_REQUEST)
      .json({
        error: err.message,
        details: err.details,
      });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR)
  res.json({
    error: err.message
  })
  res.end()
}
