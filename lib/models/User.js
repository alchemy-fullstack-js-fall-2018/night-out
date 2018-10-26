const mongoose = require('mongoose');
const { Schema } = mongoose;
const { hash, compare } = require('../util/hashing');
const { tokenize, untokenize } = require('../util/tokenizer');
const likedEveningsBySimmilarUsers = require('./user-aggregation');

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
    keywords: {
        type: [String],
    }
}, {    
    toJSON: {
        transform: function(doc, ret) {
            delete ret.__v;
            delete ret.passwordHash;
        }
    }
});

userSchema.virtual('clearPassword').set(function(password) {
    this._tempPassword = password;
});

userSchema.pre('save', function(next) {
    this.passwordHash = hash(this._tempPassword);
    next();
});

userSchema.methods.compare = function(clearPassword) {
    return compare(clearPassword, this.passwordHash);
};

userSchema.methods.authToken = function() {
    const jsonUser = this.toJSON();
    return tokenize(jsonUser);
};

userSchema.statics.findByToken = function(token) {
    try {
        const user = untokenize(token);
        return Promise.resolve(user);
    } catch(err) {
        return Promise.resolve(null);
    }
};

userSchema.statics.likedEvenings = function(keyword, zipcode) {
    return this.aggregate(likedEveningsBySimmilarUsers(keyword, zipcode));
};



module.exports = mongoose.model('User', userSchema);
