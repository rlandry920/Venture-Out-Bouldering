const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const {parse: json2csv} = require("json2csv");
const User = db.User;
const Route = db.Route;




module.exports = {
    authenticate,
    getAllUsers,
    getByUsername,
    getUser,
    getStats,
    addUser,
    editClimbingLevel,
    completeRoute,
    downloadUsers,
    addAdmin
}

async function authenticate({ username, password }) {

    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAllUsers() {
    //Returning the result of the promise.
    return await User.find().select('-hash');
}



async function getByUsername(username) {
    return await User.find({username:username});
}

async function getUser(username) {
    return await User.find({username:username});
}

async function getStats(username){
    const user = await User.findOne({username:username});
    const completedIds = user['completed']
    const completedRoutes = await Route.find( { num: { $in: completedIds} } )
    const todoRoutes = await Route.find( { num: { $nin: completedIds} } )

    let stats = {
        'complete':completedRoutes,
        'todo':todoRoutes,
        'flashed':user.flashed,
        'points':user.points
    }
    return stats
}


async function addUser(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    else  if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();

}

async function editClimbingLevel({level}, userid){
    return await User.updateOne({_id: userid}, {$set : {climbingLevel: level}});
}

async function completeRoute({routeId, accuracy, rating, flashed},userid){
    if(flashed){
        await User.updateOne({_id: userid}, {$push : {flashed: routeId}})
    }
    let route = await Route.findOne({num:routeId})
    await User.updateOne({_id: userid}, {$inc : {points: route['points']}})
    await Route.updateOne(
        {num: routeId},
        {
            $inc : {
                rating: rating,
                accuracy: accuracy,
                numRatings:1
            }
        }
    );
    return await User.updateOne({_id: userid}, {$push : {completed: routeId}});
}
async function downloadUsers(){
    const fields = ['username', 'email','firstName','lastName','climbingLevel','points','major','completed','flashed','role'];
    let users = await User.find({}).select('-hash')
    try {
        return json2csv(users, { fields });
    } catch (err) {
        return ""
    }
}

async function addAdmin({email}){
    const user = await User.findOne({email:email})
    if (user == undefined) {
        throw 'User with email: "' + email + '" does not exist';
    }
    await User.updateOne({email: email}, {$set : {role: "Admin"}})
    return user.username +' was added as Admin'
}