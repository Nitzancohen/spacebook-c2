const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const postModel = require('./models/postModel');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/posts', function (req, res) {
    postModel.Post.find({}).exec(function (err, posts) {
        if (err) { res.status(500).send(err); }
        // posts.push({text: 'false post', comments: [{text: 'blaaaah', user: 'me'}]});
        res.send(posts);
    });
});

router.post('/addPost', function(req, res) {
    req.body.comments = [];
    let newPost = req.body;
    postModel.Post.insertMany(newPost);
    res.send(newPost);
});

router.post('/removePost', function(req, res) {
    postModel.Post.findOneAndRemove(req.body).exec(function (err, post) {
        if (err) { res.status(500).send(err); }
        res.send(post);
    })
});

module.exports = router;