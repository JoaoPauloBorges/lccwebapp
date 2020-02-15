const express = require('express');
const router = express.Router();
const Topic = require('../../models/topic.model');

// routing for @/topics

//@POST /topics
//describe create a register of topic 
router.post('/', (req, resp) => {
    const topic = new Topic(req.body);
    topic.save().then((result) =>
        resp.status(201)
            .send(result), (err) => {
                resp.status(400).send(err)
            });
});

//@GET /topics
//describe returns all topics registereds 
router.get('/', (req, resp) => {
    Topic.find()
        .then((result) => {
            resp.status(200)
                .send(result);
        })
});

//@GET /topics
//describe returns a unique topic by id
router.get('/:topicId', (req, resp) => {
    Topic.findById(req.params.topicId)
        .then(result => {
            if (result === null) {
                resp.status(400)
                    .json({ msg: `No topic finded with id ${req.params.topicId}` });
            }
            resp.status(200)
                .send(result);
        });
});


router.patch('/:topicId', (req, resp) => {
    Topic.findByIdAndUpdate(
        req.params.topicId,
        req.body,
        { omitUndefined: true, new: true, useFindAndModify: false })
        .then( result => {
            resp.status(200)
            .send(result);
        });
});

router.delete('/:topicId', (req, resp) => {
    Topic.findByIdAndRemove(req.params.topicId)
    .then(result => resp.status(200).send(result));
});

module.exports = router;