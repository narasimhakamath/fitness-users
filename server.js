const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const connectDB = require("./configurations/database");

dotenv.config({path: "./configurations/configuration.env"});

// Connect to the database.
connectDB();

// const logger = require("./middlewares/logger");

// Route files.
const usersRoute = require("./routes/users");

const app = express();

if(process.env.NODE_ENV === "development") {
	app.use(morgan('dev'));
}

// app.use(logger);

// Mount routers.
app.use(`/api/v1/users`, usersRoute);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`));

// Handle unhandled promise rejections.
process.on('unhandledRejection', (error, promise) => {
	console.log(`Error: ${error['message']}`);
	server.close(() => process.exit(1));
});