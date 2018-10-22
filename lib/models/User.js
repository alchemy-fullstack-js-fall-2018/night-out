const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required']
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true 
    },
    passwordHash: String,
    zipcode: { type: String, 
        required: [true, 'Zip code is required']
    },
    initialPreferences: {
        type: [String],
        required: true,
        validate: {
            validator: initialPreferences => initialPreferences.length > 0, 
            message: () => 'At least one initial preference required'
        }
    }
}, {    
    toJSON: {
        transform: function(doc, ret) {
            delete ret.__v;
            delete ret.passwordHash;
        }
    }
});

module.exports = mongoose.model('User', userSchema);

