const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("config");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    valid: {
        type: Boolean,
        default: false,
    },
    validationToken: {
        // auto created
        type: String,
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: {
        type: String,
        default: null,
        required: false,
    },
})

UserSchema.pre("save", async function (next) {
    const user = this;
    // if (user.isModified("password")) {
    //   user.password = await bcrypt.hash(user.password, 8);
    // }
    if (!user.valid) {
        user.validationToken = crypto.randomBytes(64).toString("hex");
    }
    next();
});

UserSchema.methods.generateAuthToken = async function () {
    const { _id } = this;
    return jwt.sign({ user: { id: _id } }, config.get("JwtSecret"),);
};
UserSchema.methods.createResetPasswordToken = async function () {
    this.resetPasswordToken = crypto.randomBytes(64).toString("hex");
    this.save();
    return this.resetPasswordToken;
};
module.exports = User = mongoose.model('user', UserSchema);