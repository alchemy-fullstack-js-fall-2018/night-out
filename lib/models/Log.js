const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
    place_id: { 
        type: String, 
        required: [true, 'place_id required'] 
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: [true, 'user_id required']
    },
    rating: {
        type: String, 
        enum: ['liked', 'disliked', 'unknown'],
        required: [true, 'rating required']
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



module.exports = mongoose.model('Log', logSchema);
