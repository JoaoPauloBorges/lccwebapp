const express = require('express');
const router = express.Router();
const Researcher = require('../../models/researcher.model');

// routing for @/researchers

router.post('/', (req, resp) => {
    const researcher = new Researcher(req.body);
    console.log(researcher);
    researcher.save().then((result) =>
        resp.status(201)
            .send(result), (err) => {
                resp.status(400).send(err)
            });
});

router.get('/', (req, resp) => {
    Researcher.find()
        // .select('name url') traz apenas os atributos informados no select
        // .select('-__v') -Atributo (remove o atributo da resposta)
        .then((result) => {
            resp.status(200)
                .send(result);
        })
});

router.get('/:researcherId', (req, resp) => {
    Researcher.findById(req.params.researcherId)
        .then(result => {
            if (result === null) {
                resp.status(400)
                    .json({ msg: `No researcher finded with id ${req.params.researcherId}` });
            }
            resp.status(200)
                .send(result);
        });
});

router.patch('/:researcherId', (req, resp) => {
    Researcher.findByIdAndUpdate(
        req.params.researcherId,
        req.body,
        { omitUndefined: true, new: true, useFindAndModify: false })
        .then( result => {
            resp.status(200)
            .send(result);
        });
});

router.delete('/:researcherId', (req, resp) => {
    Researcher.findByIdAndDelete(req.params.researcherId)
    .then(result => resp.status(200).send(result));
});

module.exports = router;
