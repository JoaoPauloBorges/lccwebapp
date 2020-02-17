const express = require('express');
const router = express.Router();
const UsersController = require('./controllers/users.controller');
const ValidationMiddleware = require('../common/middleware/auth.validation.middleware');


router.post('/', [
    UsersController.insert
]);
router.get('/', [
    ValidationMiddleware.validJWTNeeded,
    UsersController.list
]);
router.get('/:userId', [
    ValidationMiddleware.validJWTNeeded,
    UsersController.getById
]);
router.delete('/:userId', [
    ValidationMiddleware.validJWTNeeded,
    UsersController.removeById
]);

module.exports = router;
