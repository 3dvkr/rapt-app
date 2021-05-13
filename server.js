const express = require("express");
const app = express();
const mongoose = require("mongoose");

const connectDB = require("./config/database");

require("dotenv").config({ path: "./config/.env" });
connectDB()
// app.set("view engine", "ejs");

const mainRoutes = require('./routes/main')

app.use("/", mainRoutes);

app.listen(3000, () => {
    console.log("Server is running");
});