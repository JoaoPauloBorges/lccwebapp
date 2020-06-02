const express = require('express');
const router = express.Router();
const Post = require('../../models/post.model');

// routing for @/posts

//@POST /posts
//describe create a register of post
router.post('/', (req, resp) => {
    const post = new Post(req.body);
    post.save().then((result) =>
        resp.status(201)
            .send(result), (err) => {
                resp.status(400).send(err)
            });
});

//@GET /posts
//describe returns all posts registereds
router.get('/', (req, resp) => {
    Post.find()
        .then((result) => {
            resp.status(200)
                .send(result);
        })
});

//@GET /posts
//describe returns a unique post by id
router.get('/:postId', (req, resp) => {
    Post.findById(req.params.postId)
        .then(result => {
            if (result === null) {
                resp.status(400)
                    .json({ msg: `No post finded with id ${req.params.postId}` });
            }
            resp.status(200)
                .send(result);
        });
});


router.patch('/:postId', (req, resp) => {
    Post.findByIdAndUpdate(
        req.params.postId,
        req.body,
        { omitUndefined: true, new: true, useFindAndModify: false })
        .then( result => {
            resp.status(200)
            .send(result);
        });
});

router.delete('/:postId', (req, resp) => {
    Post.findByIdAndDelete(req.params.postId)
    .then(result => resp.status(200).send(result));
});

module.exports = router;
