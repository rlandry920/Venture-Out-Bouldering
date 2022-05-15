var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const routeController = require("../controllers/route.controller");

router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);
router.get('/allusers', userController.getAllUsers);
router.get('/getuser/:username', userController.getUser);
router.post('/editlevel', userController.editClimbingLevel);
router.post('/completeroute', userController.completeRoute);
router.get('/getstats/:username', userController.getStats);
router.get('/downloadusers', userController.downloadUsers);
router.post('/addadmin', userController.addAdmin);
router.get('/gettotals/:username', userController.getTotals)

module.exports = router;
