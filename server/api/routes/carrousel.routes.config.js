const express = require('express');
const router = express.Router();
const Carrousel = require('../../models/carrousel.model');

// routing for @/carrousel

//@POST /carrousel
//describe create a register of carrousel 
router.post('/', (req, resp) => {
    const carrousel = new Carrousel(req.body);
    carrousel.save().then((result) =>
        resp.status(201)
            .send(result), (err) => {
                resp.status(400).send(err)
            });
});

//@GET /carrousel
//describe returns all carrousel registereds 
router.get('/', (req, resp) => {
    Carrousel.find({})
        .then((result) => {
            resp.status(200)
                .send(result);
        })
});

//@GET /carrousel
//describe returns all carrousel registereds 
router.get('/:page', (req, resp) => {
    const page = req.params.page;
    Carrousel.findOne({page})
        .then((result) => {
            resp.status(200)
                .send(result);
        })
});

router.delete('/:carrouselId', (req, resp) => {
    Carrousel.findByIdAndRemove(req.params.carrouselId)
    .then(result => resp.status(200).send(result));
});

router.patch('/:id', (req, resp) => {
    Carrousel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { omitUndefined: true, new: true, useFindAndModify: false })
        .then( result => {
            resp.status(200)
            .send(result);
        });
});
module.exports = router;