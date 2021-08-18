
const ErrorResponse = require("./../utils/errorResponse");

const errorHandler = (error, request, response, next) => {
	let errorObject = {...error};

	errorObject['message'] = error['message'];

	console.log(error.stack);

	// Mongoose Bad ObjectId Error.
	if(error['name'] === "CastError") {
		const message = `Resource not found with the ID: ${error['value']}`;
		errorObject = new ErrorResponse(message, 404);
	}

	// Mongoose Duplicate Key Error.
	if(error['code'] === 11000) {
		const message = "Resource already exists.";
		errorObject = new ErrorResponse(message, 400);
	}

	// Mongoose Validation Error.
	if(error['name'] === "ValidationError") {
		const message = Object.values(error['errors']).map(value => value['message']);
		errorObject = new ErrorResponse(message, 400);

	}

	response.status(errorObject['statusCode'] || 500).json({success: false, message: errorObject['message'] || `Server Error`});
}

module.exports = errorHandler;