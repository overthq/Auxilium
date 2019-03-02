"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var env_1 = require("./env");
mongoose.connect(env_1.default.DB_URI, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", function (error) {
    throw new Error(error);
});
db.once("open", function () {
    console.log("Connected to MongoDB!");
});
exports.default = db;
