const PaperModel = require('../models/paper.model');

exports.insert = (req, res) => {
    PaperModel.createPaper(req.body)
        .then((result) => {
            res.status(201).send(result);
        });
};

exports.list = (req, res) => {
    let limit = req.query && req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query && req.query.page) {
        req.query.page = parseInt(req.query.page);
        page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }

    PaperModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    PaperModel.findById(req.params.paperId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.update = (req, res) => {
    PaperModel.update(req.params.paperId, req.body)
        .then((result) => {
            res.status(201).send(result);
        });
}

exports.getByTopicId = (req, res) => {
    PaperModel.findByTopicId(req.params.paperId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.removeById = (req, res) => {
    PaperModel.removeById(req.params.paperId)
        .then((result) => {
            res.status(204).send(result);
        });
};