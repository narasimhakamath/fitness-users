const jwt = require("jsonwebtoken");

const asyncHandler = require("./async");
const ErrorResponse = require("./../utils/errorResponse");

const User = require("./../models/User");

// Protect routes.
exports.protect = asyncHandler(async (request, response, next) => {
	let token;

	if(request['headers']['authorization'] && request['headers']['authorization'].startsWith("Bearer"))
		token = request['headers']['authorization'].split(" ")[1];

	if(!token)
		return next(new ErrorResponse(`Not authorized to access this route.`, 401));

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		request['userID'] = await User.findById(decoded['id']);
		next();
	} catch(error) {
		return next(new ErrorResponse(`Not authorized to access this route.`, 401));

	}
});