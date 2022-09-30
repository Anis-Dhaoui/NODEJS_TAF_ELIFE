var mongoose = require('mongoose');
const PassportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema(
    {
        // username: {
        //     type: String,
        //     required: true,
        //     unique: true
        // },
        // password: {
        //     type: String,
        //     required: true
        // }
    },
    {
        timestamps: true
    }
);

userSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model('user', userSchema);