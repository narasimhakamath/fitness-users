const User = require("./../models/User");

exports.getUsers = async (request, response, next) => {
	try {
		const usersData = await User.find();
		response.status(200).json({success: true, message: "Resource found.", data: usersData});
	} catch(error) {
		response.status(400).json({success: false, message: "Internal server error."});
	}
};

exports.getUser = async (request, response, next) => {
	try {
		const userData = await User.findById(request['params']['id']);
		if(!userData)
			response.status(404).json({success: false, message: "Resource not found."});
		response.status(200).json({success: true, message: "Resource found.", data: userData});
	} catch(error) {
		response.status(400).json({success: true, message: "Internal server error."});
	}
};

exports.createUser = async (request, response, next) => {
	try {
		const user = await User.create(request['body']);
		response.status(201).json({success: true, message: "Resource created.", data: user});
	} catch(error) {
		response.status(400).json({success: false, message: "Internal server error."});
	}
};

exports.updateUser = async (request, response, next) => {
	try {
		const userData = await User.findByIdAndUpdate(request['params']['id'], request['body'], {new: true, runValidators: true});
		if(!userData)
			response.status(404).json({success: false, message: "Resource not found."});
		response.status(200).json({success: true, message: "Resource updated.", data: userData});
	} catch(error) {
		response.status(400).json({success: false, message: "Internal server error."});
	}
};

exports.deleteUser = async (request, response, next) => {
	try {
		const userData = await User.findByIdAndDelete(request['params']['id']);
		if(!userData)
			response.status(404).json({success: false, message: "Resource not found."});
		response.status(200).json({success: true, message: "Resource deleted."});
	} catch(error) {
		response.status(400).json({success: false, message: "Internal server error."});
	}
};
