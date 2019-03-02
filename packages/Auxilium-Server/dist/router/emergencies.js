"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var emergencies_1 = require("../controllers/emergencies");
var router = express_1.Router();
router.post("/create", emergencies_1.createEmergency);
exports.default = router;
