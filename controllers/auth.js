const User = require("./../models/User");
const ErrorResponse = require("./../utils/errorResponse");
const asyncHandler = require("./../middlewares/async");

exports.registerUser = asyncHandler(async (request, response, next) => {
	const { name, phoneNumber, password } = request['body'];

	const userData = await User.create({name: name, phoneNumber: phoneNumber, password: password});

	sendTokenResponse(userData, 200, response);
});

exports.loginUser = asyncHandler(async (request, response, next) => {
	const { phoneNumber, password } = request['body'];

	if(!phoneNumber || !password)
		return next(new ErrorResponse(`Please provide phone number and password`, 400));

	const userData = await User.findOne({phoneNumber: phoneNumber}).select('+password');
	if(!userData)
		return next(new ErrorResponse(`Invalid credentials`, 401));

	const isMatch = await userData.matchPassword(password);
	if(!isMatch)
		return next(new ErrorResponse(`Invalid credentials`, 401));

	sendTokenResponse(userData, 200, response);
});

const sendTokenResponse = (userData, statusCode, response) => {
	const token = userData.getSignedJWT();

	const options = {
		'expires': new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
		'httpOnly': true,
	};

	if(process.env.NODE_ENV === "production") {
		options['secure'] = true;
	}

	response.status(statusCode).cookie('token', token, options).json({success: true, message: "Token generated", token: token});
}

exports.getMe = asyncHandler(async (request, response, next) => {
	const userData = await User.findById(request['userID']);

	response.status(200).json({success: true, message: "Resourse found", data: userData});
});
