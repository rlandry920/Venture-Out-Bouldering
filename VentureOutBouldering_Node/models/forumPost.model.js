const mongoose = require('mongoose');
const {ObjectId} = require("mongoose/lib/types");
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    datePosted: { type: Date, required: true },
    postedByName: { type: String, required: true },
    postedByUsername: { type: String, required: true},
    comments: [{type: ObjectId, ref: 'ForumComment'}]
},{ collection: 'forumPosts' });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ForumPost', schema);


