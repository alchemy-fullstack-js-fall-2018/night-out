const mongoose = require('mongoose');
const { Schema } = mongoose;

const eveningSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: [true, 'user_id required']
    },
    rating: {
        type: String, 
        enum: ['liked', 'disliked', 'unknown'],
        required: [true, 'rating required']
    },
    logs: {
        type: [String],
        required: true,
        validate: {
            validator: logs => logs.length === 3, 
            message: () => 'Three Google Place Id\'s required'
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
            delete ret.passwordHash;
        }
    }
});

module.exports = mongoose.model('Evening', eveningSchema);

