const express = require('express');
const router = express.Router();
const PaperController = require('../../controllers/paper.controller');
const ValidationMiddleware = require('../../common/middleware/auth.validation.middleware');

// @/papers
router.post('/', [
    PaperController.insert
]);
router.get('/', [
    // ValidationMiddleware.validJWTNeeded,
    PaperController.list
]);
router.get('/:paperId', [
    // ValidationMiddleware.validJWTNeeded,
    PaperController.getById
]);
router.patch('/:paperId', [

    PaperController.update
]);
router.delete('/:paperId', [
    // ValidationMiddleware.validJWTNeeded,
    PaperController.removeById
]);
router.get('/topic/:paperId', [
    // ValidationMiddleware.validJWTNeeded,
    PaperController.getByTopicId
]);

module.exports = router;

