const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

module.exports = {
    User: require('../models/user.model'),
    Route: require('../models/route.model'),
    ForumComment: require('../models/forumComment.model'),
    ForumPost: require('../models/forumPost.model'),
    Value: require('../models/value.model')
};
