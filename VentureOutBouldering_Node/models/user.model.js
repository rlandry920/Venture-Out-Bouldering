const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        climbingLevel:{type:Number, required:true},
        points:{type:Number, required: false, default: 0 },
        major:{type: String, required:false, default: "Not Available"},
        completed:{type: [Number], require:false, default:[]},
        flashed:{type: [Number], require:false, default:[]},
        role: {type:String, required: true},
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
