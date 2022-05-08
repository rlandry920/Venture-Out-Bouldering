const routeService = require('../services/route.service')
const userService = require("../services/user.service");

module.exports = {
    getAllRoutes,
    getNumRoutes,
    uploadRoutes,
    downloadRoutes,
    setSetDay,
    getSetDay,
};


function getAllRoutes(req, res, next)  {
    routeService.getAllRoutes()
        .then((routes) => res.json(routes))
        .catch(err => next(err));
}

function getNumRoutes(req, res, next)  {
    routeService.getNumRoutes()
        .then((routeNums) => res.json(routeNums))
        .catch(err => next(err));
}

function uploadRoutes(req, res, next)  {
    let file = req['files'].thumbnail;
    routeService.uploadRoutes(file)
        .then((routeNums) => res.json({message:'New Routes Successfully Uploaded'}))
        .catch(err => next(err));
}

function downloadRoutes(req, res, next)  {
    routeService.downloadRoutes()
        .then((data) => {
            res.attachment('routes.csv');
            res.status(200).send(data);
        })
        .catch(err => next(err));
}
function setSetDay(req, res, next){
    routeService.setSetDay(req.body)
        .then(() => res.json({message: 'Route Set Day Successfully'}))
        .catch(err => next(err));
}

function getSetDay(req, res, next){
    routeService.getSetDay()
        .then((setday) => res.json(setday))
        .catch(err => next(err));
}



