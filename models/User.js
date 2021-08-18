const mongoose = require("mongoose");

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
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', UserSchema);