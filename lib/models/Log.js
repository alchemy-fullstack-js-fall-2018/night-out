const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
    place_id: { 
        type: String, 
        required: [true, 'place_id required'] 
    },
    name: {
        type: String,
        required: [true, 'place name required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: [true, 'user required']
    },
    rating: {
        type: String, 
        enum: ['liked', 'disliked', 'unknown'],
        default: 'unknown'
    },
    tags: {
        type: [String],
        required: true,
        validate: {
            validator: tags => tags.length > 0, 
            message: () => 'at least one tag required'
        }
    },
    price: {
        type: Number,
        min: 0,
        max: 4,
        required: [true, 'price required 0-4']
    }
}, {    
    toJSON: {
        transform: function(doc, ret) {
            delete ret.__v;
        }
    }
});

logSchema.statics.avgPrice = function(logs) {
    return logs.reduce((acc, log) => {
        return acc + log.price;
    }, 0) / logs.length;
};


module.exports = mongoose.model('Log', logSchema);
