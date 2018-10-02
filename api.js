const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('./models/postModel');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/posts', function (req, res) {
    Post.find({}).exec(function (err, posts) {
        if (err) { res.status(500).send(err); }
        // posts.push({text: 'false post', comments: [{text: 'blaaaah', user: 'me'}]});
        res.send(posts);
    });
});

router.post('/addPost', function(req, res) {
    req.body.comments = [];
    let newPost = req.body;
    newPost._id = new mongoose.Types.ObjectId();
    Post.insertMany(newPost);
    res.send(newPost);
});

router.delete('/removePost/:id', function(req, res) {
    Post.findByIdAndRemove(req.params.id).exec(function (err, post) {
        if (err) { res.status(500).send(err); }
        res.send(post);
    })
});

router.post('/addComment/:postId', function(req, res) {
    let newComment = req.body;
    newComment._id = new mongoose.Types.ObjectId();
    Post.findByIdAndUpdate(req.params.postId, { "$push": { "comments": newComment } }, { "new": true }).exec(function (err, post) {
        if (err) { res.status(500).send(err); }
        res.send(newComment);
    })
});

router.delete('/removeComment/:postId/:commentId', function(req, res) {
    Post.findById(req.params.postId, function(err, post) {
        if (err) { res.status(500).send(err); }
        post.comments.id(req.params.commentId).remove();
        post.save(function(err, data) {
            if (err) { res.status(500).send(err); }
            res.send(data);
        });
    })
});

module.exports = router;