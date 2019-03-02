"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("./auth");
var emergencies_1 = require("./emergencies");
var router = express_1.Router();
router.use("/auth", auth_1.default);
router.use("/emergencies", emergencies_1.default);
exports.default = router;
