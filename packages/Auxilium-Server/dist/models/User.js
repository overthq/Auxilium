"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    deviceId: {
        type: String,
        required: true
    }
}, { timestamps: true });
exports.default = mongoose_1.model("User", UserSchema);
