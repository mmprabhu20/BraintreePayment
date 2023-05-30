require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
var cors = require("cors");
const routes = require("./routes");
const morganFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(morgan(morganFormat));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

const port = process.env.NODE_ENV || 8000;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening at:", port);
