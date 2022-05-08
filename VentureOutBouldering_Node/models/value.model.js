const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        key: { type: String, unique: true, required: true },
        value: { type: String, required: true },
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Value', schema);
