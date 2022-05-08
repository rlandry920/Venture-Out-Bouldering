const userService = require('../services/user.service')
const routeService = require("../services/route.service");


module.exports = {
    authenticate,
    getAllUsers,
    register,
    getUser,
    getStats,
    editClimbingLevel,
    completeRoute,
    downloadUsers,
    addAdmin
};


function authenticate(req, res, next) {
       userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAllUsers(req, res, next) {
    userService.getAllUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function register(req, res, next) {

   userService.addUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}


function getUser(req, res, next){
    userService.getUser(req.params.username)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function getStats(req, res, next){
    userService.getStats(req.params.username)
        .then(stats => res.json(stats))
        .catch(err => next(err));
}

function editClimbingLevel(req, res, next){
    userService.editClimbingLevel(req.body, req.user.sub)
        .then(() => res.json({message: 'Climbing Level Updated Successfully!'}))
        .catch(err => next(err));
}

function completeRoute(req, res, next){
    userService.completeRoute(req.body, req.user.sub)
        .then(() => res.json({message: 'Route Marked as Completed!'}))
        .catch(err => next(err));
}

function downloadUsers(req, res, next)  {
    userService.downloadUsers()
        .then((data) => {
            res.attachment('users.csv');
            res.status(200).send(data);
        })
        .catch(err => next(err));
}

function addAdmin(req, res, next){
    userService.addAdmin(req.body)
        .then((message) => res.json({message: message}))
        .catch(err => next(err));
}