const UsersController = require('./controllers/users.controller');
const ValidationMiddleware = require('../common/middleware/auth.validation.middleware');


exports.routesConfig = function (app) {
    app.post('/api/users', [
        UsersController.insert
    ]);
    app.get('/api/users', [
        ValidationMiddleware.validJWTNeeded,
        UsersController.list
    ]);
    app.get('/api/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        UsersController.getById
    ]);
    app.delete('/api/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        UsersController.removeById
    ]);
};
