const express = require("express");
const app = express();

const mainRoutes = require('./routes/main')

app.use("/", mainRoutes);

app.listen(3000, () => {
    console.log("Server is running");
});