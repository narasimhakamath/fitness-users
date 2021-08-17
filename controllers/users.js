exports.getUsers = (request, response, next) => {
	response.json({success: true, message: "Show all users.", hello: request.hello});
};

exports.getUser = (request, response, next) => {
	response.json({success: true, message: "Get a user."});
};

exports.createUser = (request, response, next) => {
	response.json({success: true, message: "Creating a new user."});
};

exports.updateUser = (request, response, next) => {
	response.json({success: true, message: "Updating a user."});
};

exports.deleteUser = (request, response, next) => {
	response.json({success: true, message: "Deleting a user."});
};
