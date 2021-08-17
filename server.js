const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// const logger = require("./middlewares/logger");

// Route files.
const usersRoute = require("./routes/users");
const { response } = require("express");

dotenv.config({path: "./configurations/configuration.env"});

const app = express();

if(process.env.NODE_ENV === "development") {
	app.use(morgan('dev'));
}

// app.use(logger);

// Mount routers.
app.use(`/api/v1/users`, usersRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`));