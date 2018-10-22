const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: [true, 'Email is required.'],
        unique: true 
    },
    passwordHash: String,
    zipcode: { type: String, 
        required: [true, 'Zip code required']
    },
    initialPreferences: {
        type:[String],
        required: true
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

