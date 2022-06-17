const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const database = require('./db');
const Todos = require('./todos');
const Logs = require('./logs');

const app = express();

database.sync();
app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/health", (req, res) => {
    return res.json("up");
});

app.listen(3333, () => console.log("Server up in 3333"));

module.exports = app;