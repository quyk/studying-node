var mongoose = require('mongoose'),
    findOrCreate = require('mongoose-findorcreate'),
    bcrypt = require('bcrypt');

module.exports = function(){

    var schema = mongoose.Schema({
        login: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        password: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        inclusao: {
            type: Date,
            default: Date.now
        }
    });
    schema.plugin(findOrCreate);

    //http://blog.matoski.com/articles/jwt-express-node-mongoose/
    schema.pre('save', function (next) {
        var user = this;
        if (this.isModified('password') || this.isNew) {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return next(err);
                }
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) {
                        return next(err);
                    }
                    user.password = hash;
                    next();
                });
            });
        } else {
            return next();
        }
    });

    schema.methods.comparePassword = function (passw, cb) {
        bcrypt.compare(passw, this.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    }

    return mongoose.model('Usuario', schema);

};