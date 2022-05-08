const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forum.controller');

router.get('/allposts', forumController.getAllPosts);
router.post('/addcomment', forumController.addComment);
router.post('/addpost', forumController.addPost);


module.exports = router;
