const User = require("./../models/User");
const ErrorResponse = require("./../utils/errorResponse");
const asyncHandler = require("./../middlewares/async");

exports.getUsers = asyncHandler(async (request, response, next) => {
	const usersData = await User.find();

	response.status(200).json({success: true, message: "Resources found.", data: usersData});
});

exports.getUser = asyncHandler(async (request, response, next) => {
	const userData = await User.findById(request['params']['id']);

	if(!userData)
		return new ErrorResponse(`User not found with ID: ${request['params']['id']}`, 404);

	response.status(200).json({success: true, message: "Resource found.", data: userData});
});

exports.createUser = asyncHandler(async (request, response, next) => {
	const user = await User.create(request['body']);

	response.status(201).json({success: true, message: "Resource created.", data: user});
});

exports.updateUser = asyncHandler(async (request, response, next) => {
	const userData = await User.findByIdAndUpdate(request['params']['id'], request['body'], {new: true, runValidators: true});

	if(!userData)
		return new ErrorResponse(`User not found with ID: ${request['params']['id']}`, 404);

	response.status(200).json({success: true, message: "Resource updated.", data: userData});
});

exports.deleteUser = asyncHandler(async (request, response, next) => {
	const userData = await User.findByIdAndDelete(request['params']['id']);

	if(!userData)
		return new ErrorResponse(`User not found with ID: ${request['params']['id']}`, 404);

	response.status(200).json({success: true, message: "Resource deleted."});
});

// Service function to get the user details based on the phone number and password to generate the JSON Web Token in the API gateway.
exports.getUserData = asyncHandler(async(request, response, next) => {
	const requestBody = request['body'];

	if(!requestBody['phoneNumber'] || !requestBody['password'])
		return next(new ErrorResponse(`Please provide phone number and password`, 400));

	const userData = await User.findOne({phoneNumber: requestBody['phoneNumber']}).select('+password');
	if(!userData)
		return next(new ErrorResponse(`Invalid credentials`, 401));

	const isMatch = await userData.matchPassword(requestBody['password']);
	if(!isMatch)
		return next(new ErrorResponse(`Invalid credentials`, 401));

	response.status(200).json({success: true, message: "Token generated", data: userData, statusCode: 200});
});