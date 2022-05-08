const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    num: { type: Number, required: true },
    name: { type: String, required: true },
    grade: { type: Number, required: true },
    points: { type: Number, required: true },
    accuracy: { type: Number, required: false, default:1 },
    rating: { type: Number, required: false, default:0},
    numRatings: { type: Number, required: false, default:0}
    });

schema.index({num:1}, { unique: true });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Route', schema);


