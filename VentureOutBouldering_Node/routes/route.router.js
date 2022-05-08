const express = require('express');
const router = express.Router();
const routeController = require('../controllers/route.controller');
const userController = require("../controllers/user.controller");

router.get('/allroutes', routeController.getAllRoutes);
router.get('/numroutes', routeController.getNumRoutes);
router.get('/downloadroutes', routeController.downloadRoutes);
router.post('/uploadroutes', routeController.uploadRoutes);
router.post('/setsetday', routeController.setSetDay);
router.get('/getsetday', routeController.getSetDay);



module.exports = router;
