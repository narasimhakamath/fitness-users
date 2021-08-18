const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'name is required'],
		unqiue: true,
		trim: true
	},
	phoneNumber: {
		type: String,
		required: [true, 'phoneNumber is required'],
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: [true, 'password is required'],
		select: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

UserSchema.pre('save', async function(next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return.
UserSchema.methods.getSignedJWT = function() {
	return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE
	})
}

UserSchema.methods.matchPassword = async function(enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);