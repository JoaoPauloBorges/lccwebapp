const express = require('express');
const router = express.Router();
const VerifyUserMiddleware = require('./middleware/verify-user.middleware');
const AuthorizationController = require('./controllers/authorization.controller');
const AuthValidationMiddleware = require('../common/middleware/auth.validation.middleware');

router.post('/', [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthorizationController.login
]);

router.post('/refresh', [
    AuthValidationMiddleware.validJWTNeeded,
    AuthValidationMiddleware.verifyRefreshBodyField,
    AuthValidationMiddleware.validRefreshNeeded,
    AuthorizationController.login
]);
module.exports = router;