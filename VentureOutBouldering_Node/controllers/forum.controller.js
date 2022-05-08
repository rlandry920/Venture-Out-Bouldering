const forumService = require('../services/forum.service')
const userService = require("../services/user.service");

module.exports = {
    getAllPosts,
    addComment,
    addPost
};


function getAllPosts(req, res, next)  {
    forumService.getAllPosts()
        .then((posts) => res.json(posts))
        .catch(err => next(err));
}

function addComment(req, res, next){
    forumService.addComment(req.body, req.user.sub)
        .then((post) => res.json(post))
        .catch(err => next(err));
}

function addPost(req, res, next){
    forumService.addPost(req.body, req.user.sub)
        .then((post) => res.json(post))
        .catch(err => next(err));
}