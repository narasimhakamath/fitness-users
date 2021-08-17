const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'firstName is required'],
		trim: true
	},
	lastName: {
		type: String,
		trim: true
	},
	phoneNumber: {
		type: String,
		required: [true, 'phoneNumber is required'],
		unique: true,
		trim: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', UserSchema);