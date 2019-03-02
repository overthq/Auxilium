"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.load();
var _a = process.env, PORT = _a.PORT, DB_URI = _a.DB_URI;
var env = { PORT: PORT, DB_URI: DB_URI };
exports.default = env;
