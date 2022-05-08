const db = require('../_helpers/database');
const csv = require('fast-csv')
const mongoose = require('mongoose')
const path = require("path");
const fs = require("fs");
const {Value} = require("../_helpers/database");
const Route = db.Route;
const json2csv = require('json2csv').parse;

module.exports = {
    getAllRoutes,
    getNumRoutes,
    uploadRoutes,
    downloadRoutes,
    setSetDay,
    getSetDay
}




async function getAllRoutes() {
    return await Route.find({})
}

async function getNumRoutes(){
    const numBeginner = await Route.countDocuments({grade:0})
    const numIntermediate = await Route.countDocuments({grade:1})
    const numAdvanced = await Route.countDocuments({grade:2})
    const numExpert = await Route.countDocuments({grade:3})

    const numRoutes = [numBeginner,numIntermediate,numAdvanced,numExpert]
    return numRoutes

}

async function uploadRoutes(file){
    await db.Route.deleteMany({})
    await db.User.updateMany({},{$set : {points: 0, flashed:[],completed:[]}})
    let routes = []

    await csv.parseString(file.data.toString(), {
        headers: true,
        ignoreEmpty: true
    })
        .on('data', (data) => {
            data['_id'] = new mongoose.Types.ObjectId()
            routes.push(data)
        })
        .on('end', () => {
            Route.create(routes, (err, documents) => {
                if (err) throw err
            })
        })
}

async function downloadRoutes(){
    const fields = ['num', 'name','grade','points','accuracy','rating','numRatings'];
    let routes = await Route.find({})
    try {
        return json2csv(routes, { fields });
    } catch (err) {
        return ""
    }
}

async function setSetDay({date}){
    await Value.findOneAndUpdate({ key: 'set-day' }, {value:date}, {
        new: true,
        upsert: true // Make this update into an upsert
    });
}

async function getSetDay(){
    const data = await Value.findOne({ key: "set-day" });
    return data['value']
}

