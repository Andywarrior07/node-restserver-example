const validateJWT = require('./validate-jwt');
const validateRequest = require('./validate-request');
const validateRoles = require('./validate-roles');

module.exports = {
  ...validateJWT,
  ...validateRequest,
  ...validateRoles,
};
