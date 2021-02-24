const validateJWT = require('./validate-jwt');
const validateRequest = require('./validate-request');
const validateRoles = require('./validate-roles');
const validateFile = require('./validate-file');

module.exports = {
  ...validateJWT,
  ...validateRequest,
  ...validateRoles,
  ...validateFile,
};
