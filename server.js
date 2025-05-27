// load .env data into process.env
require("dotenv").config();

// Web server config
const express = require("express");
const morgan = require("morgan");
const http = require("http"); // Add this line

const PORT = process.env.PORT || 3001;
const app = express();

// Also add body parsing middleware early so it's applied to all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
app.use(morgan("dev"));
app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));

// Separated Routes for each Resource
const userApiRoutes = require("./routes/users-api");
const widgetApiRoutes = require("./routes/widgets-api");
const usersRoutes = require("./routes/users");
const vehiclesRoutes = require("./routes/vehicles");
const authApiRoutes = require("./routes/auth");

// Mount all resource routes
app.use("/api/users", userApiRoutes);
app.use("/api/widgets", widgetApiRoutes);
app.use("/api/vehicles", vehiclesRoutes);
app.use("/users", usersRoutes);
app.use("/api/auth", authApiRoutes);

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// REPLACE the app.listen with this code
const server = http.createServer(app);

function startServer(port) {
  server.listen(port);
}

server.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    console.log(`Port ${PORT} is in use, trying ${PORT + 1}`);
    startServer(PORT + 1);
  } else {
    console.error(e);
  }
});

server.on("listening", () => {
  console.log(`Example app listening on port ${server.address().port}`);
});

// Start the server
startServer(PORT);
