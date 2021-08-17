// Logs requests to the console.
const logger = (request, response, next) => {
	request.hello = "Hello world!";
	console.log(`${request['method']} ${request['protocol']}://${request.get('host')}${request['originalUrl']}`);
	next();
};

module.exports = logger;