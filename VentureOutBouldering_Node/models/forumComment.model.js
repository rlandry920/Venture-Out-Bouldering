const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    body: { type: String, required: true },
    datePosted: { type: Date, required: true },
    postedByName: { type: String, required: true },
    postedByUsername: { type: String, required: true},
},{ collection: 'forumComments' });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ForumComments', schema);


